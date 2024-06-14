import fs from "fs";
import path from "path";

const createFile = (key: string, val: string, distDir: string, type: boolean) => {
    // create file for component
    const dest = path.join(distDir, `${key}.ts`);
    const src = `export ${type ? "type " : ""}{ ${key} } from "../${val}";`;
    console.log(src);
    fs.writeFileSync(dest, src);
};

const buildDistFiles = () => {
    console.log("creating lib/dist dir");
    const distDir = path.join(process.cwd(), "dist");
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    console.log("adding files");
    const exportsFilePath = path.join(process.cwd(), "exports.json");
    const exports = fs.readFileSync(exportsFilePath).toString("utf-8");
    const parsedExp = JSON.parse(exports);
    parsedExp.forEach((exp: Record<string, string>) => {
        const key = Object.keys(exp)[0];
        const val = exp[key];
        const isType = exp.type as unknown as boolean;
        createFile(key, val, distDir, isType);
    });
};

export class PreBuilder {
    public static start() {
        console.log("Beginning Pre-Build");
        buildDistFiles();
    }
}
PreBuilder.start();
