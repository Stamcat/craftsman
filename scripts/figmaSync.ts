#!/usr/bin/env tsx
/* eslint-disable no-console */
import crypto from "crypto";
import fse from "fs-extra";
import path from "path";
import { defaultColors, defaultWidths } from "../src/styles/utilities/constants";

// Single entry point for all Figma sync actions. Add a new action here rather
// than creating a new one-off script, so this stays the one place that knows
// how to turn codebase sources into Figma-consumable artifacts.
type Action = "export-tokens" | "diff-components" | "record-component-state" | "sync";

const OUTPUT_DIR = path.join(process.cwd(), "scripts", "figmaSync");
const COMPONENT_STATE_PATH = path.join(OUTPUT_DIR, "component-state.json");
const DEFAULT_FINGERPRINTS_PATH = path.join(OUTPUT_DIR, "fingerprints.json");

function exportTokens() {
    const payload = {
        generatedAt: new Date().toISOString(),
        colors: defaultColors,
        widths: defaultWidths,
    };
    const outputPath = path.join(OUTPUT_DIR, "tokens.json");

    fse.ensureDirSync(OUTPUT_DIR);
    fse.writeJsonSync(outputPath, payload, { spaces: 4 });
    console.log(
        `Wrote ${Object.keys(defaultColors).length} colors and ${Object.keys(defaultWidths).length} widths to ${outputPath}`,
    );
}

type ComponentFingerprint = {
    id: string;
    key?: string;
    name: string;
    structure: unknown;
};

type ComponentState = {
    name: string;
    hash: string;
    lastSyncedAt: string;
};

// Deterministic across key order so the same Figma structure always hashes the same way.
function stableStringify(value: unknown): string {
    if (Array.isArray(value)) {
        return `[${value.map(stableStringify).join(",")}]`;
    }
    if (value && typeof value === "object") {
        const keys = Object.keys(value as Record<string, unknown>).sort();
        return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

function hashFingerprint(fingerprint: ComponentFingerprint): string {
    return crypto.createHash("sha256").update(stableStringify(fingerprint.structure)).digest("hex");
}

function readFingerprints(fingerprintsPath: string): ComponentFingerprint[] {
    const resolvedPath = path.resolve(process.cwd(), fingerprintsPath);

    if (!fse.existsSync(resolvedPath)) {
        console.error(`No such fingerprints file: ${resolvedPath}`);
        process.exit(1);
    }
    return fse.readJsonSync(resolvedPath) as ComponentFingerprint[];
}

function loadComponentState(): Record<string, ComponentState> {
    if (!fse.existsSync(COMPONENT_STATE_PATH)) {
        return {};
    }
    return fse.readJsonSync(COMPONENT_STATE_PATH) as Record<string, ComponentState>;
}

// Compares fresh fingerprints (captured via a use_figma script, scoped to each
// component's named section) against the committed baseline, without
// re-reading or re-reasoning about components whose hash hasn't moved.
function diffComponents() {
    const rawArgs = process.argv.slice(3);

    // An explicit path is always the first arg; everything after it (or all of it, if
    // no path was given) is one or more component names to filter down to, so
    // `diff-components Button Input` only diffs those two.
    const explicitPath = rawArgs[0]?.endsWith(".json") ? rawArgs[0] : undefined;
    const fingerprintsPath = explicitPath ?? DEFAULT_FINGERPRINTS_PATH;
    const nameFilters = (explicitPath ? rawArgs.slice(1) : rawArgs)
        .map((name) => name.trim().toLowerCase())
        .filter(Boolean);

    const fingerprints = readFingerprints(fingerprintsPath).filter(
        (fingerprint) =>
            nameFilters.length === 0 || nameFilters.some((filter) => fingerprint.name.toLowerCase().includes(filter)),
    );
    const state = loadComponentState();

    const added: string[] = [];
    const changed: string[] = [];
    const unchanged: string[] = [];

    for (const fingerprint of fingerprints) {
        const stateKey = fingerprint.key ?? fingerprint.id;
        const hash = hashFingerprint(fingerprint);
        const previous = state[stateKey];

        if (!previous) {
            added.push(fingerprint.name);
        } else if (previous.hash !== hash) {
            changed.push(fingerprint.name);
        } else {
            unchanged.push(fingerprint.name);
        }
    }

    console.log(JSON.stringify({ added, changed, unchanged }, null, 4));
}

// Call once a component's "changed"/"added" diff has been reviewed and acted
// on, to move the baseline forward so it stops being re-flagged. An optional
// comma-separated name list records only those components, leaving any
// declined recommendations still flagged on the next diff.
function recordComponentState() {
    const fingerprintsPath = process.argv[3];
    const onlyNames = process.argv[4]?.split(",").map((name) => name.trim());

    if (!fingerprintsPath) {
        console.error("Usage: tsx scripts/figmaSync.ts record-component-state <fingerprints.json> [name1,name2]");
        process.exit(1);
    }

    const fingerprints = readFingerprints(fingerprintsPath).filter(
        (fingerprint) => !onlyNames || onlyNames.includes(fingerprint.name),
    );
    const state = loadComponentState();
    const now = new Date().toISOString();

    for (const fingerprint of fingerprints) {
        const stateKey = fingerprint.key ?? fingerprint.id;

        state[stateKey] = {
            name: fingerprint.name,
            hash: hashFingerprint(fingerprint),
            lastSyncedAt: now,
        };
    }

    fse.ensureDirSync(OUTPUT_DIR);
    fse.writeJsonSync(COMPONENT_STATE_PATH, state, { spaces: 4 });
    console.log(`Recorded state for ${fingerprints.length} component(s) in ${COMPONENT_STATE_PATH}`);
}

// This step can't run as a plain Node script — fingerprinting requires the
// Figma MCP `use_figma` tool, which only exists inside an agent chat session.
// So instead of doing nothing, print the exact prompt for the user to paste in.
// Optional component names scope the whole sync (capture + diff) to just those
// components, so a targeted check doesn't pay the cost of fingerprinting everything.
function printSyncPrompt() {
    const names = process.argv
        .slice(3)
        .map((name) => name.trim())
        .filter(Boolean);
    const scope =
        names.length > 0 ? `only the following component(s): ${names.join(", ")}` : "each component's named section";

    console.log(
        [
            "Paste this into your agent chat to run the Figma sync:",
            "",
            `"Follow the craftsman-figma-sync skill to check for Figma component updates: capture fingerprints from ${scope}, run npm run figma:diff-components${names.length > 0 ? ` ${names.join(" ")}` : ""}, and for any added/changed components, recommend code updates."`,
        ].join("\n"),
    );
}

const actions: Record<Action, () => void> = {
    "export-tokens": exportTokens,
    "diff-components": diffComponents,
    "record-component-state": recordComponentState,
    sync: printSyncPrompt,
};

const action = process.argv[2] as Action | undefined;

if (!action || !(action in actions)) {
    console.error(`Usage: tsx scripts/figmaSync.ts <${Object.keys(actions).join(" | ")}>`);
    process.exit(1);
}

actions[action]();
