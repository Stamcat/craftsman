import { css } from "styled-components";
import { color } from "../../utilities/colors";
import { gutter } from "../../utilities/layout";
/* #__PURE__ */
export const blockquote = css`
    blockquote {
        background: ${color("gray1")};
        padding: ${gutter()};
        border: 1px solid ${color("gray2")};
        border-left-width: 4px;
        border-radius: 6px;
        display: flex;
    }
`;
