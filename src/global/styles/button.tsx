import { css } from "styled-components";
import { gutter } from "../../utilities/layout";
import { color } from "../../utilities/colors";
import { typeStyles } from "../../utilities/font";
/* #__PURE__ */
export const button = css`
    button {
        border-radius: 20px;
        border: 1px solid transparent;
        padding: ${gutter(0.25)} ${gutter()};
        height: fit-content;
        align-items: center;
        background: transparent;
        color: ${color("garden")};
        ${typeStyles.p}
        &:hover {
            cursor: pointer;
        }
    }
`;
