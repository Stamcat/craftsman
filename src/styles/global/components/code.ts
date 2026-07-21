import { css } from "@emotion/react";

export const code = css`
    background-color: var(--gray200);
    color: var(--gray800);
    padding: calc(var(--w-gutter) * 0.125) calc(var(--w-gutter) * 0.25);
    margin: calc(var(--w-gutter) * 0.125);
    display: inline-block;
    &:has(pre) {
        padding: var(--w-gutter);
        border-radius: calc(var(--w-gutter) * 0.5);
        background-color: var(--gray800);
        color: var(--gray200);
    }

    &:has(pre) pre {
        margin: 0;
    }
`;
