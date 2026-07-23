import { css } from "@emotion/react";
import { typography } from "./typography";
import z from "zod";
import { width } from "../../utilities/layout";
import { color } from "../../utilities/color";

export const ButtonType = z.enum(["primary", "default", "text"]);
export type ButtonType = z.infer<typeof ButtonType>;

export const textLinkStyles = css`
    padding: 0;
    border: none;
    background: none;
    color: ${color("blue500")};
    &:not(:disabled):not(.disabled):hover {
        color: ${color("teal700")};
        background-color: transparent;
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const button = css`
    --btn-pad-y: ${width("gutter", 0.5)};
    --btn-pad-x: ${width("gutter", 0.75)};
    --btn-border-radius: ${width("gutter", 0.75)};
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
    border: 1px solid ${color("blue500")};
    background-color: ${color("white")};
    &:not(:disabled):not(.disabled):hover {
        background-color: ${color("teal200")};
    }
    &.text,
    &[data-variant="text"] {
        ${textLinkStyles}
    }
    &:disabled,
    &.disabled {
        cursor: not-allowed;
        border-color: ${color("gray200")};
        color: ${color("gray400")};
        &.primary,
        &[data-variant="primary"] {
            border-color: ${color("gray200")};
            background-color: ${color("gray400")};
            color: ${color("gray200")};
        }
    }
    &.primary,
    &[data-variant="primary"] {
        color: ${color("white")};
        background-color: ${color("blue500")};
        &:not(:disabled):not(.disabled):hover {
            background-color: ${color("blue700")};
        }
    }
`;

