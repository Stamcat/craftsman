#!/usr/bin/env node
import { readFileSync } from "fs";
import { join } from "path";

const { version } = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8"));
const isPreRelease = /-(alpha|beta)\./.test(version);

if (!isPreRelease && !process.env.CI) {
    console.error(
        "\x1b[31mERROR: Full releases can only be published from CI. " +
        "Use an alpha or beta pre-release for local publishing (e.g. npm run release:alpha).\x1b[0m"
    );
    process.exit(1);
}
