import { css } from "@emotion/react";

export const code = css`
    background-color: var(--grey200);
    color: var(--grey800);
    padding: calc(var(--w-gutter) * 0.125) calc(var(--w-gutter) * 0.25);
    margin: calc(var(--w-gutter) * 0.125);
    display: inline-block;
    &:has(pre) {
        padding: var(--w-gutter);
        border-radius: calc(var(--w-gutter) * 0.5);
        background-color: var(--grey800);
        color: var(--grey200);
    }

    &:has(pre) pre {
        margin: 0;
    }
`;
