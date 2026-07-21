import { css, type CSSObject, type SerializedStyles } from "@emotion/react";
import type { Breakpoint, LayoutWidthsType } from "./types";
import { defaultWidths } from "./constants";

const widthVar = (key: Exclude<LayoutWidthsType, "mobileMax" | "tabletMax" | "desktopMax"> | "text") =>
    `var(--w-${key}, ${defaultWidths[key]}px)`;

const maxWidthVar = (baseKey: "tablet" | "desktop" | "extDesktop") => `calc(${widthVar(baseKey)} - 0.00001px)`;

export const widths = {
    text: widthVar("text"),
    column: widthVar("column"),
    gutter: widthVar("gutter"),
    extDesktop: widthVar("extDesktop"),
    extNav: widthVar("extNav"),
    desktop: widthVar("desktop"),
    tablet: widthVar("tablet"),
    extMobile: widthVar("extMobile"),
    mobileMax: maxWidthVar("tablet"),
    tabletMax: maxWidthVar("desktop"),
    desktopMax: maxWidthVar("extDesktop"),
};


export const media = {
    get mobile() {
        return `(min-width: 0px)`;
    },
    get tablet() {
        return `(min-width: ${widths.tablet}px)`;
    },
    get desktop() {
        return `(min-width: ${widths.desktop}px)`;
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
