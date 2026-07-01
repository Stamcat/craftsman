import { css } from "@emotion/react";
import { button } from "./components/button";
import { colors, media, widths } from "./variables";
import { pre } from "./components/pre";
import { typographyStyles } from "./components/typography";

export const globalStyles = css`
    :root {
        ${widths}
        ${media}
        ${colors}
        color-scheme: light dark;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /* Scrollbar container */
    ::-webkit-scrollbar {
        width: 4px; /* vertical scrollbar width */
        height: 4px; /* horizontal scrollbar height */
    }

    /* Scrollbar track */
    ::-webkit-scrollbar-track {
        background: #ddd;
    }

    /* Scrollbar thumb */
    ::-webkit-scrollbar-thumb {
        background: #000;
        border-radius: 6px;
    }

    /* On hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    body {
        background-color: #fff;
        /* Enable smooth scrolling on mobile */
        -webkit-overflow-scrolling: touch;
        /* Prevent scroll chaining issues in iframes */
        overscroll-behavior: contain;
        margin: 0;
        padding: 0;
    }
    fieldset {
        padding: 0px;
        border: 0px;
    }
    pre {
        ${pre}
    }
    button {
        ${button}
    }
    ul {
        margin: 0;
        padding: 0;
    }
    ${typographyStyles}
`;
