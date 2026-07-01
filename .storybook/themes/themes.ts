import type { AppTheme } from "../../src/styles/theme/types";

/**
 * This is provided by the consuming application
 */
export const appThemes: AppTheme = {
    default: {
        root: {
            backgroundColor: "#efefef",
        },
        components: {
            button: {
                border: "2px solid black",
                borderRadius: "4px",
            },
        },
    },
    green: {
        components: {
            button: {
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "2px solid green",
                borderRadius: "8px",
            },
        },
    },
    purple: {
        colors: {
            "--blue500": "#f704cf",
        },
        components: {
            button: {
                backgroundColor: "var(--blue500)",
                color: "#ffffff",
                borderRadius: "4px",
                border: "1px solid blue",
            },
        },
    },
};;;;

