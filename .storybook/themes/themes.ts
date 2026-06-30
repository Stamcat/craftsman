import { AppTheme } from "../../src/styles/theme/types";

/**
 * This is provided by the consuming application
 */
export const appThemes: AppTheme = {
    default: {
        colors: {
            "--blue500": "#f704cf"
        },
        components: {
            button: {
                backgroundColor: "#ccc",
                color: "#ffffff",
                borderRadius: "4px",
                border: "1px solid blue"
            },
        },
    },
    green: {
        components: {
            button: {
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "2px solid green",
                borderRadius: "8px"
            },
        },
    },
};

