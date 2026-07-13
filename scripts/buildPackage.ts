/* eslint-disable no-console */
import fse from "fs-extra";
import path from "path";

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the
// compiled js files in the root of the package.
// It will not be included in the npm package.
const getComponentIndexPath = () => {
    const exportsConfigPath = path.join(process.cwd(), "exports.ts");

    if (!fse.existsSync(exportsConfigPath)) {
        return undefined;
    }

    const exportsConfig = fse.readFileSync(exportsConfigPath, "utf-8");
    const componentFolderMatch = exportsConfig.match(/Components\s*:\s*["']([^"']+)["']/);

    if (!componentFolderMatch?.[1]) {
        return undefined;
    }

    return path.join(process.cwd(), "src", componentFolderMatch[1], "index.ts");
};

const getComponentExports = () => {
    const componentIndexPath = getComponentIndexPath();

    if (!componentIndexPath || !fse.existsSync(componentIndexPath)) {
        return [] as string[];
    }

    const indexSource = fse.readFileSync(componentIndexPath, "utf-8");
    const exportRegex = /^\s*export\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*["'][^"']+["'];?\s*$/gm;
    const exports: string[] = [];
    let match: RegExpExecArray | null = exportRegex.exec(indexSource);

    while (match) {
        exports.push(match[1]);
        match = exportRegex.exec(indexSource);
    }
    return exports;
};


const createPackageJson = () => {
    const buildExportsMap = (componentNames: string[]) => {
        const subpathExports = componentNames.reduce<Record<string, { types: string; default: string }>>(
            (acc, componentName) => {
                acc[`./${componentName}`] = {
                    types: `./src/components/${componentName}.d.ts`,
                    default: `./src/components/${componentName}.esm.js`,
                };
                return acc;
            },
            {},
        );

        return {
            ".": {
                types: "./src/components/index.d.ts",
                default: "./Components.esm.js",
            },
            ...subpathExports,
        };
    };

    // copy package file into destination folder
    const pkgSrc = path.join(process.cwd(), "package.json");
    const source = fse.readFileSync(pkgSrc).toString("utf-8");
    const sourceObj = JSON.parse(source);

    // keep publish guard script in dist package
    const prepublishOnly = sourceObj?.scripts?.prepublishOnly;
    sourceObj.scripts = prepublishOnly ? { prepublishOnly } : {};
    sourceObj.devDependencies = {};
    sourceObj.main = "./Components.esm.js";
    sourceObj.types = "./src/components/index.d.ts";
    const componentExports = getComponentExports();
    if (componentExports.length > 0) {
        sourceObj.exports = buildExportsMap(componentExports);
    } else {
        delete sourceObj.exports;
    }

    const pkgDest = path.join(process.cwd(), "dist", "package.json");
    console.log(`writing ${pkgSrc} to ${pkgDest}`);
    const pkgSrcBuffer = Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8");
    fse.writeFileSync(pkgDest, pkgSrcBuffer);

    console.log("package.json file created");
};
const copyFile = (name: string) => {
    const readmeSrc = path.join(process.cwd(), name);
    const readmeDest = path.join(process.cwd(), "dist", name);
    console.log(`writing ${readmeSrc} to ${readmeDest}`);

    const ignoreFile = fse.readFileSync(readmeSrc).toString("utf-8");
    const src = Buffer.from(ignoreFile, "utf-8");
    fse.writeFileSync(readmeDest, src as never);

    console.log("readme file created");
};
const copyPrepublishScript = () => {
    const scriptSrc = path.join(process.cwd(), "scripts", "prepublishCheck.js");
    const scriptDest = path.join(process.cwd(), "dist", "scripts", "prepublishCheck.js");

    if (!fse.existsSync(scriptSrc)) {
        console.log(`publish guard script not found: ${scriptSrc}`);
        return;
    }

    console.log(`writing ${scriptSrc} to ${scriptDest}`);
    fse.ensureDirSync(path.dirname(scriptDest));
    fse.copyFileSync(scriptSrc, scriptDest);
    console.log("publish guard script copied");
};
const createIgnoreFile = () => {
    const ignoreSrc = path.join(process.cwd(), ".npmignore");
    const ignoreDest = path.join(process.cwd(), "dist", ".npmignore");
    console.log(`writing ${ignoreSrc} to ${ignoreDest}`);

    const ignoreFile = fse.readFileSync(ignoreSrc).toString("utf-8");
    const src = Buffer.from(ignoreFile, "utf-8");
    fse.writeFileSync(ignoreDest, src);

    console.log("ignore file created");
};
const fromDir = (startPath: string, filter: string) => {
    console.log("Starting from dir " + startPath + "/");

    if (!fse.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fse.readdirSync(startPath);
    for (const element of files) {
        const filename = path.join(startPath, element);
        const stat = fse.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            console.log("-- found: ", filename);
            const newPath = path.join(process.cwd(), "dist", filename);

            fse.copy(filename, newPath, (err: unknown) => {
                if (err) {
                    console.log("an error");
                    console.log(err);
                }
            });
        }
    }
};
const copyExtension = (filePath: string, arr: string[]) => {
    arr.forEach((ext) => {
        fromDir(filePath, ext);
    });
};

export class PackageBuilder {
    static main() {
        console.log("Beginning Build");
        createPackageJson();
        copyPrepublishScript();
        createIgnoreFile();
        copyExtension("src", [".scss", ".css", ".png", ".jpg", ".ttf", ".bin"]);
        copyFile("README.md");
        copyFile("AGENTS.md");
    }
}
