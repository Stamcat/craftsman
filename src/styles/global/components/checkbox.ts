import { css } from "@emotion/react";
import { color } from "../../utilities/color";

export const checkboxStyles = css`
    &[type="checkbox"] {
        appearance: none;
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        vertical-align: baseline;
        top: 0.08em;
        margin: 0;
        padding: 0;
        height: 16px;
        width: 16px;
        border-radius: 4px;
        border: 1px solid ${color("blue500")};
        background: #fff;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 4px;
            background: transparent;
            transition: background-color 0.15s ease;
        }

        &::after {
            position: absolute;
            left: 50%;
            top: 45%;
            width: 5px;
            height: 8px;
            content: "";
            display: block;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: translate(-50%, -58%) rotate(45deg) scale(0);
            transform-origin: center;
            transition: transform 0.15s ease;
        }

        &:checked {
            border-color: ${color("blue500")};
            &::before {
                background-color: ${color("blue500")};
            }
            &::after {
                transform: translate(-50%, -58%) rotate(45deg) scale(1);
            }
        }

        &:disabled {
            border-color: ${color("gray500")};
            &::before {
                background-color: ${color("gray200")};
            }
            &::after {
                border-color: ${color("gray200")};
                transform: translate(-50%, -58%) rotate(45deg) scale(1);
            }
        }

        &:checked:disabled {
            border-color: ${color("gray400")};
            &::before {
                background: ${color("gray400")};
            }
            &::after {
                border-color: ${color("white")};
                transform: translate(-50%, -58%) rotate(45deg) scale(1);
            }
        }
    }
`;
