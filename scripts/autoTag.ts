import { isEmpty } from "../src/utilities/validations";
import { getJSONFromFile } from "./utilities";
const { exec } = require("node:child_process");

const pushTag = async (version: string) => {
    console.log("Pushing Tag");
    await exec(`git push origin v${version}`, (err: Error, stdout: unknown, stderr: unknown) => {
        if (err) {
            console.log(err);
        }
        if (stderr) {
            console.log(stderr);
        }
        console.log(stdout);
    });
};
const createTag = (version: string) => {
    console.log(`creating tag called v${version}`);
    exec(`git tag v${version}`, (err: Error, stdout: unknown, stderr: unknown) => {
        if (err) {
            console.log(err);
        }
        if (stderr) {
            console.log(stderr);
        }
        console.log(stdout);
    });
};
const checkTagExistence = (version: string) => {
    // @ts-expect-error -- child process
    exec(`git tag -l v${version}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        if (stderr) {
            console.log(stderr);
            throw new Error(stderr);
        }
        console.log(stdout);
        if (stdout === `v${version}`) {
            console.log("version tag already exists, nothing to do here");
            process.exit(0);
        } else if (isEmpty(stdout)) {
            console.log(`creating tag for version ${version}`);
            AutoTag.create();
        }
        process.exit(0);
    });
};

export class AutoTag {
    static check() {
        const version = getJSONFromFile("./package.json").version;
        checkTagExistence(version);
    }
    static create() {
        const version = getJSONFromFile("./package.json").version;
        createTag(version);
        pushTag(version);
    }
}
