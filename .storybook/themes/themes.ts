import { color } from "../../src/styles";
import type { AppTheme, Theme } from "../../src/styles/theme/types";
import greenRoot from "./green.scss?inline";
import greenButton from "./green.button.scss?inline"; // these aren't errors.

import button from "./teal/button.scss?inline";
import buttonBase from "./teal/button-base.scss?inline";
import input from "./teal/input.scss?inline";
import inputBase from "./teal/input-base.scss?inline";
import inputPhone from "./teal/inputPhone.scss?inline";
import select from "./teal/select.scss?inline";
import selectBase from "./teal/select-base.scss?inline";
import checkbox from "./teal/checkbox.scss?inline";
import checkboxBase from "./teal/checkbox-base.scss?inline";
import toggle from "./teal/toggle.scss?inline";
import datePicker from "./teal/datePicker.scss?inline";
import modal from "./teal/modal.scss?inline";
import radioButton from "./teal/radioButton.scss?inline";
import radioButtonBase from "./teal/radioButton-base.scss?inline";

export const tealTheme: Theme = {
    colors: {
        "--teal900": "#1f5c55",
        "--teal800": "#235e57",
        "--teal700": "#0d9488",
        "--teal600": "#14b8a6",
        "--teal500": "#86c5b8",
        "--gray600": "#818181ff",
        "--text": "#151515",
    },
    root: {},
    // this is really helpful if your app can't use a global styles object
    base: `
        ${buttonBase}
        ${inputBase}
        ${checkboxBase}
        ${radioButtonBase}
        ${selectBase}
    `,
    components: {
        datePicker,
        button,
        input,
        inputPhone,
        //     carousel: carouselStyles,
        modal,
        select,
        checkbox,
        toggle,
        radioButton,
    },
};



export const appThemes: AppTheme = {
    default: {
        root: {
            "--w-gutter": "14px",
        },
    },
    teal: tealTheme,
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

