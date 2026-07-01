import { css } from "@emotion/react";
import { color } from "../../utilities/color";

export const pre = css`
    overflow: auto;
    text-align: left;
    border-radius: 6px;
    background: ${color("grey800")};
    color: ${color("grey200")};
    padding: calc(var(--w-gutter) * 0.5);
`;
