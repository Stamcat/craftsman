#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

// This script ships to dist/ and runs via `npm publish` with no node_modules present
// (the publish jobs only download the dist/ build artifact), so it must have zero
// external dependencies. Do not import third-party packages here.

const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8"));
const { version, name: packageName } = pkg;
const isPreRelease = /-(alpha|beta)\./.test(version);

if (!isPreRelease && !process.env.CI) {
    console.error(
        "\x1b[31mERROR: Full releases can only be published from CI. " +
        "Use an alpha or beta pre-release for local publishing (e.g. npm run release:alpha).\x1b[0m"
    );
    process.exit(1);
}

// Agent-facing docs hand-write the package name as literal text (no build-time templating
// exists for markdown). Guard against it drifting out of sync with package.json's `name`.
const AGENT_DOC_GLOBS = ["AGENTS.md", "README.md", "skills/**/*.md", "src/components/**/AGENTS.md"];
// Third-party scoped packages that legitimately appear in these docs.
const KNOWN_THIRD_PARTY_SCOPES = [
    "@floating-ui/react-dom",
    "@storybook/addon-docs",
    "@atlaskit/pragmatic-drag-and-drop",
    "@wojtekmaj/react-daterange-picker",
];
const scopedPackageRegex = /@[\w.-]+\/[\w-]+/g;

// Minimal stand-in for `glob` supporting only the "literal" and "dir/**/name-or-*.ext"
// patterns used in AGENT_DOC_GLOBS above.
const globSync = (pattern, cwd) => {
    const wildcardIndex = pattern.indexOf("**");
    if (wildcardIndex === -1) {
        return existsSync(join(cwd, pattern)) ? [pattern] : [];
    }

    const baseDir = pattern.slice(0, wildcardIndex).replace(/\/$/, "");
    const suffix = pattern.slice(wildcardIndex + 2).replace(/^\//, "");
    const matchesSuffix = (fileName) => (suffix.startsWith("*") ? fileName.endsWith(suffix.slice(1)) : fileName === suffix);

    const results = [];
    const walk = (relDir) => {
        const absDir = join(cwd, relDir);
        if (!existsSync(absDir)) {
            return;
        }
        for (const entry of readdirSync(absDir, { withFileTypes: true })) {
            const relPath = join(relDir, entry.name);
            if (entry.isDirectory()) {
                walk(relPath);
            } else if (matchesSuffix(entry.name)) {
                results.push(relPath);
            }
        }
    };
    walk(baseDir);
    return results;
};

const docFiles = AGENT_DOC_GLOBS.flatMap((pattern) => globSync(pattern, process.cwd()));
const staleReferences = [];

for (const file of docFiles) {
    const contents = readFileSync(join(process.cwd(), file), "utf-8");
    const matches = contents.match(scopedPackageRegex) ?? [];

    for (const match of matches) {
        if (match !== packageName && !KNOWN_THIRD_PARTY_SCOPES.includes(match)) {
            staleReferences.push(`${file}: ${match}`);
        }
    }
}

if (staleReferences.length > 0) {
    console.error(
        `\x1b[31mERROR: Found doc references that don't match package.json's name ("${packageName}"). ` +
        "Update these files, or add the reference to KNOWN_THIRD_PARTY_SCOPES in scripts/prepublishCheck.js " +
        `if it's a legitimate third-party package:\x1b[0m\n${staleReferences.join("\n")}`
    );
    process.exit(1);
}

// Walks the "exports" map and collects every file path referenced by a "default"/"types"
// condition (or a bare string export target), so each one can be checked against what the
// build actually emitted. This is what catches an exports map pointing at files that don't exist
// (e.g. ".esm.js" entries when the bundler emitted ".es.js") before it ever reaches npm.
const collectExportPaths = (exportsMap) => {
    const paths = [];

    const visit = (node) => {
        if (typeof node === "string") {
            paths.push(node);
        } else if (node && typeof node === "object") {
            for (const value of Object.values(node)) {
                visit(value);
            }
        }
    };

    visit(exportsMap);
    return paths;
};

if (pkg.exports) {
    const missingExports = collectExportPaths(pkg.exports)
        .filter((exportPath) => exportPath.startsWith("."))
        .filter((exportPath) => !existsSync(join(process.cwd(), exportPath)));

    if (missingExports.length > 0) {
        console.error(
            "\x1b[31mERROR: package.json's \"exports\" map references files that don't exist in the " +
            `published package:\x1b[0m\n${missingExports.join("\n")}\n` +
            "Check that the build output's file naming matches exports.ts/buildPackage.ts."
        );
        process.exit(1);
    }
}
