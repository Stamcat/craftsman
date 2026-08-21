import { color } from "../../src/styles";
import type { AppTheme } from "../../src/styles/theme/types";
import greenRoot from "./green.scss?inline";
import greenButton from "./green.button.scss?inline"; // these aren't errors.

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
            select: {
                borderColor: color("green500"),
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
            text: {
                color: color("green500"),
            },
            radioButton: {
                accentColor: color("green700"),
            },
            textarea: {
                borderColor: color("green500"),
            },
            modal: {
                border: `2px solid ${color("green500")}`,
            },
            pagination: {
                borderColor: color("green500"),
                ".active": {
                    border: `1px solid ${color("green500")}`,
                },
            },
            carousel: {
                borderColor: color("green500"),
            },
            tooltip: {
                color: color("green500"),
            },
            loader: {
                color: color("green500"),
            },
            inputPassword: {
                ".input-view-toggle": {
                    color: color("green700"),
                },
            },
            inputPhone: {
                // this var is consumed directly by react-international-phone's own border rule
                "--react-international-phone-border-color": color("green500"),
            },
            datePicker: {
                ".react-date-picker__wrapper": {
                    borderColor: color("green500"),
                },
                ".react-date-picker__button": {
                    color: color("green500"),
                },
            },
            timePicker: {
                ".react-time-picker__wrapper": {
                    borderColor: color("green500"),
                },
                ".react-time-picker__button": {
                    color: color("green500"),
                },
                ".input-view-toggle": {
                    borderColor: "transparent",
                },
            },
            dateTimePicker: {
                ".react-datetime-picker__wrapper": {
                    borderColor: color("green500"),
                },
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

