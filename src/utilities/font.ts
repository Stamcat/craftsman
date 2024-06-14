import { css } from "styled-components";
import { color } from "./colors";

export const typeStyles = {
    h1: css`
        font-size: 50px;
        line-height: ${50 * 1.2}px;
        letter-spacing: -1.5px;
    `,
    h2: css`
        font-size: 42px;
        line-height: ${42 * 1.1}px;
        letter-spacing: -1.26px;
    `,
    h3: css`
        font-size: 32px;
        line-height: ${32 * 1.1}px;
        letter-spacing: -0.96px;
    `,
    h4: css`
        font-size: 24px;
        line-height: ${24 * 1.1}px;
        letter-spacing: -0.24px;
    `,
    h5: css`
        font-size: 20px;
        line-height: ${20 * 1.2}px;
        letter-spacing: -0.2px;
    `,
    p: css`
        font-weight: 300;
        font-style: normal;
        font-size: 16px;
        line-height: ${16 * 1.5}px;
        color: ${color("almostBlack")};
    `,
};
