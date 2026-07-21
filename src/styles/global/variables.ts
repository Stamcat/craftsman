import { colors as jsColors } from "../utilities/color";
import { defaultWidths } from "../utilities/constants";

const widthDefaults = {
    ...defaultWidths,
    mobileMax: defaultWidths.tablet - 0.00001,
    tabletMax: defaultWidths.desktop - 0.00001,
    desktopMax: defaultWidths.extDesktop - 0.00001,
};

/**
 * This creates CSS variables from our strictly typed dictionary of colors
 */
export const colors = Object.entries(jsColors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");

/**
 * This creates CSS variables from our strictly typed dictionary of widths
 */
export const widths = Object.entries(widthDefaults)
    .map(([key, value]) => `--w-${key}: ${value}px;`)
    .join("\n");

// this isn't supported by css variables
// export const media = Object.entries(jsMedia)
//     .map(([key, value]) => `--bp-${key}: ${value};`)
//     .join("\n");
