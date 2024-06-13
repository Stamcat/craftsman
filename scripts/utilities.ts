import path from "path";
import fs from "fs";

export const getJSONFromFile = (filePath: string) => {
    const json = path.join(process.cwd(), ...filePath.split("/"));
    return JSON.parse(fs.readFileSync(json, "utf-8"));
};
