import { css } from "@emotion/react";
import { typography } from "./typography";
import z from "zod";

export const ButtonType = z.enum(["primary", "default", "text"]);
export type ButtonType = z.infer<typeof ButtonType>;

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
    &:not(:disabled):hover {
        background-color: var(--blue200);
    }
    &:disabled {
        cursor: not-allowed;
    }
    &.text {
        padding: 0;
        border: none;
        background: none;
        &:not(:disabled):hover {
            color: var(--blue800);
            background-color: transparent;
            text-decoration: underline;
        }
    }
    &.primary {
        color: var(--white);
        background-color: var(--blue500);
        &:not(:disabled):hover {
            background-color: var(--blue700);
        }
    }
`;

