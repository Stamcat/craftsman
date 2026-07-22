import { css } from "@emotion/react";
import { breakpoint, width } from "../../utilities/layout";
import { color } from "../../utilities/color";

export const typography = {
    body: css`
        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        color: ${color("text")};
        line-height: 1.5;
        font-weight: 400;
        font-size: ${width("text")};
    `,
    h1: css`
        font-size: ${width("text", 3.125)};
        line-height: 1.2;
    `,
    h2: css`
        font-size: ${width("text", 2.625)};
        font-weight: 625;
        line-height: 1.1;
    `,
    h3: css`
        font-size: ${width("text", 1.625)};
        line-height: 1.1;
    `,
    h4: css`
        font-size: ${width("text", 1.25)};
        line-height: 1.1;
        margin: ${width("gutter", 0.5)} 0px;
        ${breakpoint(
            "mobileOnly",
            css`
                font-size: ${width("text")};
            `,
        )}
    `,
    h5: css`
        font-size: ${width("text")};
        line-height: 1.2;
    `,
    h6: css`
        font-size: ${width("text", 0.875)};
        line-height: 1.2;
        font-weight: 600;
    `,
    p: css`
        font-style: normal;
        font-size: ${width("text")};
        line-height: 1.5;
        margin: 0;
        ${breakpoint(
            "mobileOnly",
            css`
                line-height: 1.5;
                font-size: ${width("text", 0.875)};
            `,
        )}
    `,
};

export const typographyStyles = Object.entries(typography).map(([tag, styles]) =>
    css({
        [tag]: styles,
    }),
);
