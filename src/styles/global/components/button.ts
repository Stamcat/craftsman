import { css } from "@emotion/react";
import { typography } from "./typography";
import z from "zod";

export const ButtonType = z.enum(["primary", "default", "text"]);
export type ButtonType = z.infer<typeof ButtonType>;

export const button = css`
    --btn-pad-y: calc(var(--w-gutter) * 0.5);
    --btn-pad-x: calc(var(--w-gutter) * 0.75);
    --btn-border-radius: calc(var(--w-gutter) * 0.75);
    ${typography.body}
    border: none;
    cursor: pointer;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight: 500;
    transition: 0.125s;
    padding: var(--btn-pad-y) var(--btn-pad-x);
    border-radius: var(--btn-border-radius);
    border: 1px solid var(--blue600);
    background-color: var(--white);
    &:not(:disabled):not(.disabled):hover {
        background-color: var(--blue200);
    }
    &.text {
        padding: 0;
        border: none;
        background: none;
        &:not(:disabled):not(.disabled):hover {
            color: var(--blue800);
            background-color: transparent;
            text-decoration: underline;
        }
    }
    &:disabled,
    &.disabled {
        cursor: not-allowed;
        border-color: var(--grey200);
        color: var(--grey400);
        &.primary {
            border-color: var(--grey200);
            background-color: var(--grey400);
            color: var(--grey200);
        }
    }
    &.primary {
        color: var(--white);
        background-color: var(--blue500);
        &:not(:disabled):not(.disabled):hover {
            background-color: var(--blue700);
        }
    }
`;

