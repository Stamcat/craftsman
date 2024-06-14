import fse from "fs-extra";
import path from "path";

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the
// compiled js files in the root of the package.
// It will not be included in the npm package.
const createPackageJson = () => {
    // copy package file into destination folder
    const pkgSrc = path.join(process.cwd(), "package.json");
    const source = fse.readFileSync(pkgSrc).toString("utf-8");
    const sourceObj = JSON.parse(source);

    // remove scripts and devdependencies
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};

    const pkgDest = path.join(process.cwd(), "lib", "package.json");
    console.log(`writing ${pkgSrc} to ${pkgDest}`);
    const pkgSrcBuffer = Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8");
    fse.writeFileSync(pkgDest, pkgSrcBuffer);

    console.log("package.json file created");
};
const createIgnoreFile = () => {
    const ignoreSrc = path.join(process.cwd(), ".npmignore");
    const ignoreDest = path.join(process.cwd(), "lib", ".npmignore");
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
            const newPath = path.join(process.cwd(), "lib", filename);

            fse.copy(filename, newPath, (err) => {
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
        createIgnoreFile();
        copyExtension("src", [".scss", ".css", ".png", ".jpg", ".ttf", ".bin"]);
    }
}
