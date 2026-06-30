import { css } from "@emotion/react";
import { button } from "../components/button";
import { colors } from "./colors";

export const globalStyles = css`
    ${colors}
    button {
        ${button}
    }

`;
