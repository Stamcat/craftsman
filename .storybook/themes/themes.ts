import { color } from "../../src/styles";
import type { AppTheme } from "../../src/styles/theme/types";
import greenRoot from "./green.scss?inline";
import greenButton from "./green.button.scss?inline";

export const appThemes: AppTheme = {
    default: {
        root: {
            "--w-gutter": "14px",
        },
    },
    green: {
        root: greenRoot,
        components: {
            button: greenButton,
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
            button: {
                backgroundColor: "var(--blue500)",
                color: "#fff",
                borderRadius: "4px",
                border: "1px solid blue",
            },
        },
    },
};

