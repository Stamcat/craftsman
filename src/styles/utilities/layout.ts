import { css, type CSSObject, type SerializedStyles } from "@emotion/react";

export type LayoutWidthsType =
    | "column"
    | "gutter"
    | "extDesktop"
    | "extNav"
    | "desktop"
    | "tablet"
    | "extMobile"
    | "mobileMax"
    | "tabletMax"
    | "desktopMax";

export type Breakpoint =
    | "mobile"
    | "tablet"
    | "desktop"
    | "extDesktop"
    | "mobileOnly"
    | "tabletOnly"
    | "mobileTablet"
    | "desktopOnly";

export const widths = {
    text: 16,
    column: 60,
    gutter: 16,
    extDesktop: 1320,
    extNav: 1240,
    desktop: 1040,
    tablet: 660,
    extMobile: 320,
    mobileMax: 660 - 0.00001,
    tabletMax: 1040 - 0.00001,
    desktopMax: 1320 - 0.00001,
};
export const media = {
    mobile: `(min-width: 0px)`,
    tablet: `(min-width: ${widths.tablet}px)`,
    desktop: `(min-width: ${widths.desktop}px)`,
    extDesktop: `(min-width: ${widths.extDesktop}px)`,
    mobileOnly: `(min-width: 0px) and (max-width: ${widths.mobileMax}px)`,
    tabletOnly: `(min-width: ${widths.tablet}px) and (max-width: ${widths.tabletMax}px)`,
    mobileTablet: `(min-width: 0px) and (max-width: ${widths.tabletMax}px)`,
    desktopOnly: `(min-width: ${widths.desktop}px) and (max-width: ${widths.desktopMax}px)`,
};
/**
 * Returns width based on key.
 * @param w - key of the stored width
 * @returns
 */
/* #__PURE__ */
export const width = (w: LayoutWidthsType, multiplier: number = 1, px: boolean = true): string => {
    let gutters = 0;
    // if we're getting width of column, we should add in gutter spacing between columns.
    if (w === "column") {
        const m = multiplier - 1;
        gutters = widths.gutter * m;
    }
    return `${widths[w] * multiplier + gutters}${px ? "px" : ""}}`;
};

/**
 * Creates responsive breakpoints styles
 * @param bp
 * @param styles
 * @returns
 */
/* #__PURE__ */
export const breakpoint = (bp: Breakpoint, styles: SerializedStyles | CSSObject) => {
    return css`@media ${media[bp]} {
        ${styles}
    }`
};  
