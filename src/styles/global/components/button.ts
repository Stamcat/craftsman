import { css } from "@emotion/react";
import { typography } from "./typography";

export const button = css`
    ${typography.body}
    border: none;
    cursor: pointer;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight: 500;
    transition: 0.125s;
    padding: calc(var(--w-gutter) * 0.5) calc(var(--w-gutter) * 0.75);
    border-radius: calc(var(--w-gutter) * 0.75);
    border: 1px solid var(--blue600);
    background-color: var(--white);
    &:hover {
        background-color: var(--blue200);
    }
    &:disabled {
        cursor: not-allowed;
    }
    &.text {
        padding: 0;
        border: none;
        background: none;
        &:hover {
            color: var(--blue800);
            text-decoration: underline;
        }
    }
    &.primary {
        color: var(--white);
        background-color: var(--blue500);
        &:hover {
            background-color: var(--blue700);
        }
    }
`;

