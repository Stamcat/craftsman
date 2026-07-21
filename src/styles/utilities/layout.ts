import { css, type CSSObject, type SerializedStyles } from "@emotion/react";
import { LayoutWidthsSchema, type Breakpoint, type LayoutWidthsType } from "./types";
import { defaultWidths } from "./constants";

export const widths: Record<LayoutWidthsType, string> = Object.fromEntries(
    LayoutWidthsSchema.options.map((w) => [w, `var(--w-${w}, ${defaultWidths[w]}px)`]),
) as Record<LayoutWidthsType, string>;


export const media = {
    get mobile() {
        return `(min-width: 0px)`;
    },
    get mobileMax() {
        return `(max-width: ${widths.mobileMax}px)`;
    },
    get tablet() {
        return `(min-width: ${widths.tablet}px)`;
    },
    get tabletMax() {
        return `(max-width: ${widths.tabletMax}px)`;
    },
    get desktop() {
        return `(min-width: ${widths.desktop}px)`;
    },
    get desktopMax() {
        return `(max-width: ${widths.desktopMax}px)`;
    },
    get extDesktop() {
        return `(min-width: ${widths.extDesktop}px)`;
    },
    get mobileOnly() {
        return `(min-width: 0px) and (max-width: ${widths.mobileMax}px)`;
    },
    get tabletOnly() {
        return `(min-width: ${widths.tablet}px) and (max-width: ${widths.tabletMax}px)`;
    },
    get mobileTablet() {
        return `(min-width: 0px) and (max-width: ${widths.tabletMax}px)`;
    },
    get desktopOnly() {
        return `(min-width: ${widths.desktop}px) and (max-width: ${widths.desktopMax}px)`;
    },
};
/**
 * Returns width based on key.
 * @param w - key of the stored width
 * @returns
 */
export const width = (w: LayoutWidthsType, multiplier: number = 1, px: boolean = true): string => {
    const value = widths[w];

    if (w === "column") {
        const gutterSteps = multiplier - 1;
        const pxExpr = `calc((${value} * ${multiplier}) + (${widths.gutter} * ${gutterSteps}))`;

        if (px) {
            return pxExpr;
        }

        return `calc(((${value} / 1px) * ${multiplier}) + ((${widths.gutter} / 1px) * ${gutterSteps}))`;
    }

    if (px) {
        return multiplier === 1 ? value : `calc(${value} * ${multiplier})`;
    }

    return multiplier === 1 ? `calc(${value} / 1px)` : `calc((${value} / 1px) * ${multiplier})`;
};

/**
 * Creates responsive breakpoints styles
 * @param bp
 * @param styles
 * @returns
 */
export const breakpoint = (bp: Breakpoint, styles: SerializedStyles | CSSObject) => {
    return css`@media ${media[bp]} {
        ${styles}
    }`
};  
