export type ColorType = "rgba" | "hex";

export const colors = {
    text: "#2e2e2e",
    primary: "#005cac",
    transparent: "transparent",
    white: "#ffffff",
    black: "#000000",
    grey50: "#f8fafc",
    grey100: "#f1f5f9",
    grey200: "#e2e8f0",
    grey300: "#cbd5e1",
    grey400: "#94a3b8",
    grey500: "#64748b",
    grey600: "#475569",
    grey700: "#334155",
    grey800: "#1e293b",
    grey900: "#0f172a",

    blue50: "#eff6ff",
    blue100: "#dbeafe",
    blue200: "#bfdbfe",
    blue300: "#93c5fd",
    blue400: "#60a5fa",
    blue500: "#3b82f6",
    blue600: "#2563eb",
    blue700: "#1d4ed8",
    blue800: "#1e40af",
    blue900: "#1e3a8a",

    green50: "#f0fdf4",
    green100: "#dcfce7",
    green200: "#bbf7d0",
    green300: "#86efac",
    green400: "#4ade80",
    green500: "#22c55e",
    green600: "#16a34a",
    green700: "#15803d",
    green800: "#166534",
    green900: "#14532d",

    yellow50: "#fefce8",
    yellow100: "#fef9c3",
    yellow200: "#fef08a",
    yellow300: "#fde047",
    yellow400: "#facc15",
    yellow500: "#eab308",
    yellow600: "#ca8a04",
    yellow700: "#a16207",
    yellow800: "#854d0e",
    yellow900: "#713f12",

    red50: "#fef2f2",
    red100: "#fee2e2",
    red200: "#fecaca",
    red300: "#fca5a5",
    red400: "#f87171",
    red500: "#ef4444",
    red600: "#dc2626",
    red700: "#b91c1c",
    red800: "#991b1b",
    red900: "#7f1d1d",

    purple50: "#faf5ff",
    purple100: "#f3e8ff",
    purple200: "#e9d5ff",
    purple300: "#d8b4fe",
    purple400: "#c084fc",
    purple500: "#a855f7",
    purple600: "#9333ea",
    purple700: "#7e22ce",
    purple800: "#6b21a8",
    purple900: "#581c87",
};

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
    hex = hex.replace('#', '');  
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
        throw new Error('Invalid hex color format');
    }
    
    // Ensure alpha is between 0 and 1
    alpha = Math.max(0, Math.min(1, alpha));
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const color = (name: ColorKey, type: ColorType = "hex", alpha: number = 1) => {
    if (type === "rgba") {
        return hexToRgba(name, alpha);
    }
    return colors[name];
}
