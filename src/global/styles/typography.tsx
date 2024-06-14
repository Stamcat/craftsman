import { css } from "styled-components";
import { color } from "../../utilities/colors";
import { width } from "../../utilities/layout";
import { typeStyles } from "../../utilities/font";
const HEADERS = css`
    h1 {
        ${typeStyles.h1}
    }
    h2 {
        ${typeStyles.h2}
    }
    h3 {
        ${typeStyles.h3}
    }
    h4 {
        ${typeStyles.h4}
    }
    h5,
    h6 {
        ${typeStyles.h5}
    }
`;
// H5 and H6 are the same according to Dentsu's design system.

const small = css`
    small {
        font-size: 14px;
        line-height: ${14 * 1.5}px;
    }
`;
const strong = css`
    strong {
        font-weight: 600;
    }
`;
/* #__PURE__ */
export const typography = css`
    html,
    body {
        font-family: ${(props) => (props.theme.distributor ? "Inter" : "Noto Sans")}, "sans-serif";
        ${typeStyles.p}
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${color("greenDark2")};
        font-style: normal;
        font-weight: 400;
        margin: ${width("gutter")} 0;
    }
    ${HEADERS}
    p {
        margin: ${width("gutter")} 0;
    }
    ${small}
    ${strong}
`;
