import { css } from "@emotion/react";
import { colors } from "./colors";
import { button } from "../components/button";

export const globalStyles = css`
    ${colors}
    button {
        ${button}
    }

`;
