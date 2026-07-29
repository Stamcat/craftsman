import { color } from "../../src/styles";
import type { AppTheme } from "../../src/styles/theme/types";
import styles from "./theme.module.scss";
/**
 * This is provided by the consuming application
 * we can use js styling or css/sass modules
 */
export const appThemes: AppTheme = {
    default: {
        // you can put your own brand styles here
        root: {
            "--w-gutter": "14px",
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
            input: {
                borderColor: color("green500"),
                borderWidth: "2px",
            },
            checkbox: {
                borderColor: color("green700"),
                borderWidth: "3px",
                backgroundColor: color("beige300"),
            },
        },
    },
    purple: {
        colors: {
            "--blue500": "#31198a",
        },
        components: {
            button: styles.button,
        },
    },
};
