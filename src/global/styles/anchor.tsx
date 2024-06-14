import { css } from "styled-components";
import { color } from "../../utilities/colors";
/* #__PURE__ */
export const anchor = css`
    a {
        color: ${color("greenLink")};
        text-decoration: underline;
        // text-decoration: none;
        cursor: pointer;
        &.active {
            font-weight: bold;
        }
        &:hover {
            text-decoration: underline;
            transition: all 0.08s ease-in;
        }
        &:active {
            text-decoration: none;
        }
    }
`;
