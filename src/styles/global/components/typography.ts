import { css } from "@emotion/react";
import { breakpoint } from "../../utilities/layout";

export const typography = {
    body: css`
        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        color: var(--text);
        line-height: 1.5;
        font-weight: 400;
        font-size: var(--w-text) px;
    `,
    h1: css`
        font-size: calc(var(--w-text) * 3.125);
        line-height: 1.2;
    `,
    h2: css`
        font-size: calc(var(--w-text) * 2.625);
        font-weight: 625;
        line-height: 1.1;
    `,
    h3: css`
        font-size: calc(var(--w-text) * 1.625);
        line-height: 1.1;
    `,
    h4: css`
        font-size: calc(var(--w-text) * 1.25);
        line-height: 1.1;
        margin: calc(var(--w-gutter) * 0.5) 0px;
        ${breakpoint(
            "mobileOnly",
            css`
                font-size: var(--w-text);
            `,
        )}
    `,
    h5: css`
        font-size: var(--w-text) px;
        line-height: 1.2;
    `,
    h6: css`
        font-size: calc(var(--w-text) * 0.875);
        line-height: 1.2;
        font-weight: 600;
    `,
    p: css`
        font-style: normal;
        font-size: var(--w-text);
        line-height: 1.5;
        margin: 0;
        ${breakpoint(
            "mobileOnly",
            css`
                line-height: 1.5;
                font-size: calc(var(--w-text) * 0.875);
            `,
        )}
    `,
};

export const typographyStyles = Object.entries(typography).map(([tag, styles]) =>
    css({
        [tag]: styles,
    }),
);
