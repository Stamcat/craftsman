import { css } from "@emotion/react";
import { color } from "../../utilities/color";

export const radioBtnStyles = css`
    --radio-btn-size: 16px;

    transition: border-color 0.2s ease;
    appearance: none;
    cursor: pointer;
    position: relative;
    display: inline-grid;
    place-content: center;
    margin: 0;
    padding: 0;
    width: var(--radio-btn-size);
    height: var(--radio-btn-size);
    border: 1px solid ${color("blue600")};
    border-radius: 50%;
    box-sizing: border-box;

    &::before {
        content: "";
        width: calc(var(--radio-btn-size) * 0.5);
        height: calc(var(--radio-btn-size) * 0.5);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.2s ease;
        background-color: ${color("blue600")};
    }

    &:checked {
        border-color: ${color("gray500")};
        &::before {
            transform: scale(1);
        }
    }
`;
