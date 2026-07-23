import { css } from "@emotion/react";
import { color } from "../../utilities/color";
import { width } from "../../utilities/layout";

export const input = css`
    color: ${color("text")};
    border-radius: 3px;
    border: 1px solid ${color("gray400")};
    padding: ${width("gutter", 0.5)};
    background-color: ${color("white")};

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
    &:disabled,
    &.disabled {
        border-color: ${color("gray200")};
        background-color: ${color("gray100")};
    }
    &:focus {
        outline: 0;
        box-shadow: none;
    }
`;

export const inputErrorStyles = css`
    margin-top: ${width("gutter", 0.25)};
    font-size: ${width("text", 0.75)};
    color: ${color("red600")};
`;

export const inputFieldAdornmentStyles = css`
    .input-field {
        position: relative;
        display: inline-flex;
        width: 100%;
        align-items: center;

        > input {
            width: 100%;
            padding-right: calc(${width("gutter", 0.5)} + 24px + ${width("gutter", 0.5)});
        }

        > .input-adornment {
            position: absolute;
            right: ${width("gutter", 0.5)};
            top: 50%;
            transform: translateY(-50%);
            margin-top: 0;
            z-index: 1;
            display: inline-flex;
            align-items: center;
        }
    }
`;

export const tinyLabelStyles = css`
    .input-label {
        top: -0.5rem;
        left: ${width("gutter", 0.25)};
        font-size: ${width("text", 0.75)};
    }
`;

export const insideLabelStyles = (hasInput: boolean) => css`
    --react-international-phone-height: 50px;
    --react-international-phone-border-radius: 8px;
    --react-international-phone-border-color: #c0c0c0ff;
    position: relative;

    .input-label {
        position: absolute;
        background-color: white;
        z-index: 1;
        width: fit-content;
        padding: 0 5px;
        top: ${width("gutter", 0.25)};
        left: ${width("gutter", 0.25)};
        pointer-events: none;
        transition:
            top 150ms ease,
            left 150ms ease,
            font-size 150ms ease,
            color 150ms ease;
    }

    > label > input,
    > input {
        transition: border-color 200ms ease;
    }

    &:focus-within {
        ${tinyLabelStyles}
        .input-label {
            color: ${color("blue500")};
        }
        input {
            border-color: ${color("blue500")};
        }
    }

    &:has(input:not(:placeholder-shown)),
    &:has(input:-webkit-autofill) {
        ${tinyLabelStyles}
    }

    ${hasInput && tinyLabelStyles}

    input[type="tel"] {
        width: 100%;
    }

    input::placeholder {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    &:focus-within input::placeholder {
        opacity: 1;
    }
`;

