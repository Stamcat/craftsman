import { getJSONFromFile } from "./utilities";
import { isEmpty } from "../src/utilities/validations";
const { exec } = require("node:child_process");

const pushTag = async (version: string) => {
    console.log("pushing tag");
    await exec(`git push origin v${version}`, (err: Error, stdout: unknown, stderr: unknown) => {
        if (err) {
            throw new Error(err.message);
        }
        if (stderr) {
            throw new Error(stderr.toString());
        }
        console.log(stdout);
    });
};
const createTag = (version: string) => {
    exec(`git tag v${version}`, (err: Error, stdout: unknown, stderr: unknown) => {
        if (err) {
            throw new Error(err.message);
        }
        if (stderr) {
            throw new Error(stderr.toString());
        }
        console.log(stdout);
    });
};
const checkTagExistence = (version: string) => {
    exec(`git tag -l v${version}`, (err, stdout, stderr) => {
        if (err) {
            throw new Error(err);
        }
        if (stderr) {
            throw new Error(stderr);
        }
        console.log(stdout);
        if (stdout === `v${version}`) {
            console.log("version already exists, nothing to do here");
        } else if (isEmpty(stdout)) {
            AutoTag.create();
        }
    });
};

export class AutoTag {
    public static check() {
        const ver = getJSONFromFile("./package.json").version;
        checkTagExistence(ver);
    }
    public static create() {
        const ver = getJSONFromFile("./package.json").version;
        createTag(ver);
        pushTag(ver);
    }
}
