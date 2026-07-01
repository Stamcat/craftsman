import { css } from "@emotion/react";
import { colors as jsColors } from "../utilities/color";

/**
 * This creates CSS variables from our strictly typed dictionary of colors
 */
export const colors = css`
	:root {
        ${Object.entries(jsColors)
            .map(([key, value]) => `--${key}: ${value};`)
            .join("\n")}
	}

`;
