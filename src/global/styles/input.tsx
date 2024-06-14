import { css } from "styled-components";
import { color } from "../../utilities/colors";
import { gutter } from "../../utilities/layout";
/* #__PURE__ */
export const input = css`
    input {
        color: ${color("almostBlack")};
        border-radius: 3px;
        border: 1px solid ${color("gray4")};
        padding: ${gutter(0.5)};

        &[type="number"]::-webkit-outer-spin-button,
        &[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        &[type="number"] {
            -moz-appearance: textfield;
        }
        &:disabled {
            border-color: ${color("gray2")};
            background-color: ${color("gray1")};
        }
        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }
`;
