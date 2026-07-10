import { colors as jsColors } from "../utilities/color";
import { widths as jsWidths } from "../utilities/layout";

/**
 * This creates CSS variables from our strictly typed dictionary of colors
 */
export const colors = Object.entries(jsColors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");

/**
 * This creates CSS variables from our strictly typed dictionary of widths
 */
export const widths = Object.entries(jsWidths)
    .map(([key, value]) => `--w-${key}: ${value}px;`)
    .join("\n");

// this isn't supported by css variables
// export const media = Object.entries(jsMedia)
//     .map(([key, value]) => `--bp-${key}: ${value};`)
//     .join("\n");
