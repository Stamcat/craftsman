import { css } from "@emotion/react";
import type { AppTheme } from "../../src/styles/theme/types";
import styles from "./theme.module.scss";
/**
 * This is provided by the consuming application
 * we can use js styling, emotion styled-components, or css/sass modules
 */
export const appThemes: AppTheme = {
    default: {
        // you can put your own brand styles here
        root: {
            "--w-gutter": "14px",
        },
    },
    jsStyling: {
        components: {
            button: {
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "2px solid green",
                borderRadius: "8px",
            },
        },
    },
    emotionStyles: {
        colors: {
            "--blue500": "#31198a",
        },
        components: {
            button: css`
                background-color: var(--blue500);
                color: #fff;
                border-radius: 4px;
                border: 1px solid blue;
            `,
        },
    },
    scssModules: {
        colors: {
            "--blue500": "#31198a",
        },
        components: {
            button: styles.button,
        },
    },
};
