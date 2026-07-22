import { css } from "@emotion/react";
import { color } from "../../utilities/color";
import { width } from "../../utilities/layout";

export const input = css`
        color: ${color("text")};
        border-radius: 3px;
        border: 1px solid ${color("gray400")};
        padding: ${width("gutter", 0.5)};
        background-color: ${color("white")};

        &[type="number"]::-webkit-outer-spin-button,
        &[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        &[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
        }
        &:disabled, &.disabled {
            border-color: ${color("gray200")};
            background-color: ${color("gray100")};
        }
        &:focus {
            outline: 0;
            box-shadow: none;
        }

`;
