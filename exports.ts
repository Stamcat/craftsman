
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
    [`./${EXPORTS.Styles}/globalStyles.scss`]: {
        default: `./src/${EXPORTS.Styles}/global/globalStyles.scss`,
    },
    [`./${EXPORTS.Styles}/config`]: {
        default: `./src/${EXPORTS.Styles}/_config.scss`,
    },
    [`./${EXPORTS.Styles}/utilities/functions`]: {
        default: `./src/${EXPORTS.Styles}/utilities/_functions.scss`,
    },
    [`./${EXPORTS.Styles}/utilities/mixins`]: {
        default: `./src/${EXPORTS.Styles}/utilities/_mixins.scss`,
    },
    [`./${EXPORTS.Styles}/utilities/placeholders`]: {
        default: `./src/${EXPORTS.Styles}/utilities/_placeholders.scss`,
    },
    [`./${EXPORTS.Styles}/global/components`]: {
        default: `./src/${EXPORTS.Styles}/global/components/_index.scss`,
    },
} as const;


