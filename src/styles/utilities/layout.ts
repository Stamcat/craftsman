import { css, type CSSObject, type SerializedStyles } from "@emotion/react";
import type { Breakpoint, LayoutWidthsType, ResponsiveWidth } from "./types";
import { getCraftsmanConfig } from "./config";

const widthKeys = [
    "text",
    "column",
    "gutter",
    "extDesktop",
    "extNav",
    "desktop",
    "tablet",
    "extMobile",
    "mobileMax",
    "tabletMax",
    "desktopMax",
] as const satisfies readonly (keyof ResponsiveWidth)[];

const widthDescriptors = widthKeys.reduce<PropertyDescriptorMap>((acc, key) => {
    acc[key] = {
        enumerable: true,
        get: () => getCraftsmanConfig().widths[key],
    };
    return acc;
}, {});

export const widths = Object.defineProperties({} as ResponsiveWidth, widthDescriptors) as ResponsiveWidth;


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
    let gutters = 0;
    // if we're getting width of column, we should add in gutter spacing between columns.
    if (w === "column") {
        const m = multiplier - 1;
        gutters = widths.gutter * m;
    }
    return `${widths[w] * multiplier + gutters}${px ? "px" : ""}`;
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
