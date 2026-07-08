import { colors as jsColors } from "../utilities/color";
import { widths as jsWidths, media as jsMedia } from "../utilities/layout";

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

export const media = Object.entries(jsMedia)
    .map(([key, value]) => `--bp-${key}: ${value};`)
    .join("\n");
