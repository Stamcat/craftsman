
export const EXPORTS = {
    Components: "components",
    Styles: "styles",
    Utilities: "utilities",
} as const;

export const PACKAGE_EXPORTS = {
    ".": {
        types: `./src/${EXPORTS.Components}/index.d.ts`,
        default: "./Components.esm.js",
    },
    [`./${EXPORTS.Styles}`]: {
        types: `./src/${EXPORTS.Styles}/index.d.ts`,
        default: "./Styles.esm.js",
    },
    [`./${EXPORTS.Utilities}`]: {
        types: `./src/${EXPORTS.Utilities}/index.d.ts`,
        default: "./Utilities.esm.js",
    },
    [`./${EXPORTS.Styles}/globalStyles`]: {
        default: `./src/${EXPORTS.Styles}/global/globalStyles.scss`,
    },
    [`./${EXPORTS.Styles}/globalStyles.scss`]: {
        default: `./src/${EXPORTS.Styles}/global/globalStyles.scss`,
    },
} as const;


