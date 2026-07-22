import { css } from "@emotion/react";
import { color } from "../../utilities/color";
import { width } from "../../utilities/layout";

export const code = css`
    background-color: ${color("gray200")};
    color: ${color("gray800")};
    padding: ${width("gutter", 0.125)} ${width("gutter", 0.25)};
    margin: ${width("gutter", 0.125)};
    display: inline-block;
    font-size: ${width("text")};
    &:has(pre) {
        padding: ${width("gutter")};
        border-radius: ${width("gutter", 0.5)};
        background-color: ${color("gray800")};
        color: ${color("gray200")};
    }

    &:has(pre) pre {
        margin: 0;
    }
`;
