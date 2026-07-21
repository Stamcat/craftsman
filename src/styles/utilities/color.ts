import { defaultColors } from "./constants";
import type { ColorType } from "./types";

export const colors = { ...defaultColors } as Record<string, string>;

/**
 * Type representing all available color keys in the colors object
 */
export type ColorKey = keyof typeof colors;
/**
 * Converts a hex color value to rgba format
 * @param hex The hex color string (e.g., "#RRGGBB" or "#RRGGBBAA")
 * @param alpha Optional alpha value (0-1), defaults to 1
 * @returns RGBA color string in the format "rgba(r, g, b, a)"
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
    // Remove # if present
    hex = hex.replace("#", "");
    // Parse the r, g, b values
    let r, g, b;

    if (hex.length === 6) {
        // #RRGGBB format
        r = Number.parseInt(hex.substring(0, 2), 16);
        g = Number.parseInt(hex.substring(2, 4), 16);
        b = Number.parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 8) {
        // #RRGGBBAA format
        r = Number.parseInt(hex.substring(0, 2), 16);
        g = Number.parseInt(hex.substring(2, 4), 16);
        b = Number.parseInt(hex.substring(4, 6), 16);
        // Extract alpha from the last two characters
        const hexAlpha = Number.parseInt(hex.substring(6, 8), 16);
        alpha = hexAlpha / 255; // Convert from 0-255 to 0-1 range
    } else if (hex.length === 3) {
        // #RGB format
        r = Number.parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = Number.parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = Number.parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
        throw new Error("Invalid hex color format");
    }

    // Ensure alpha is between 0 and 1
    alpha = Math.max(0, Math.min(1, alpha));

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const color = (name: ColorKey, type: ColorType = "hex", alpha: number = 1) => {
    if (type === "rgba") {
        return hexToRgba(colors[name], alpha);
    }
    return colors[name];
};
