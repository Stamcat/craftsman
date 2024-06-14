import { css } from "styled-components";
import { ExecutionContext, RuleSet } from "styled-components/dist/types";

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

export type Breakpoint = "mobile" | "tablet" | "desktop" | "extDesktop" | "mobileOnly" | "tabletOnly" | "desktopOnly";

export const publicLayoutWidths = {
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
export const dsLayoutWidths = {
    ...publicLayoutWidths,
    gutter: 12,
};
const themedWidth = (props: ExecutionContext & object) => {
    return (props.theme.distributor && dsLayoutWidths) || publicLayoutWidths;
};

/**
 * Returns width based on key.
 * @param w - key of the stored width
 * @returns
 */
/* #__PURE__ */
export const width = (w: LayoutWidthsType, multiplier: number = 1): RuleSet<object> => {
    return css`
        ${(props) => {
            const g = themedWidth(props);
            return `${g[w] * multiplier}px`;
        }}
    `;
};

/**
 * Width between components, useful for standardizing margins & paddings
 * @deprecated Use width("gutter") instead.
 * @param multiplier - optional, useful for splitting gutter in half, etc.
 * @returns
 */
/* #__PURE__ */
export const gutter = (multiplier: number = 1): RuleSet<object> => {
    return css`
        ${(props) => {
            const g = themedWidth(props)["gutter"];
            return `${g * multiplier}px`;
        }}
    `;
};
/**
 * Creates responsive breakpoints styles
 * @param bp
 * @param styles
 * @returns
 */
/* #__PURE__ */
export const breakpoint = (bp: Breakpoint, styles: RuleSet<object> | string): RuleSet<object> => {
    return css`
        ${(props) => {
            const lw = themedWidth(props);
            const media = {
                mobile: `(min-width: 0px)`,
                tablet: `(min-width: ${lw.tablet}px)`,
                desktop: `(min-width: ${lw.desktop}px)`,
                extDesktop: `(min-width: ${lw.extDesktop}px)`,
                mobileOnly: `(min-width: 0px) and (max-width: ${lw.mobileMax}px)`,
                tabletOnly: `(min-width: ${lw.tablet}px) and (max-width: ${lw.tabletMax}px)`,
                desktopOnly: `(min-width: ${lw.desktop}px) and (max-width: ${lw.desktopMax}px)`,
            };
            return `@media ${media[bp]} {
                ${styles}
            }`;
        }}
    `;
};
/**
 * This returns min and max media queries to wrap your styles.
 * This mainly exists to support the container function,
 * but can be used on its own if needed.
 * @param columns
 * @param min
 * @param max
 * @returns
 */
/* #__PURE__ */
export const responsiveWidth = (columns: number, min: RuleSet<object>, max?: RuleSet<object>): RuleSet<object> => {
    if (!max) {
        return css`
            @media (min-width: ${min}) {
                width: ${(props) => {
                    const w = themedWidth(props);
                    return `${w["column"] * columns + w["gutter"] * (columns - 1)}px`;
                }};
            }
        `;
    }
    return css`
        @media (min-width: ${min}) and (max-width: ${max}) {
            width: ${(props) => {
                const w = themedWidth(props);
                return `${w["column"] * columns + w["gutter"] * (columns - 1)}px`;
            }};
        }
    `;
};
/**
 * Params are a multiplier for number of columns we want in a container.
 * Use this to wrap the entire body of the page & use flexbox within
 * example: container(4, 8, 12)
 * @param mWidth
 * @param tWidth
 * @param dWidth
 * @param extWidth
 * @returns
 */
/* #__PURE__ */
export const container = (
    mWidth: number = 4,
    tWidth: number = mWidth,
    dWidth: number = tWidth,
    extWidth: number = dWidth,
): RuleSet<object> => {
    if (extWidth === mWidth) {
        return css`
            width: ${(props) => {
                const w = themedWidth(props);
                return `${w["column"] * mWidth + (mWidth - 1) * w["gutter"]}px`;
            }};
        `;
    } else {
        const mQuery = responsiveWidth(
            mWidth,
            css`
                ${`0px`}
            `,
            tWidth !== mWidth ? width("mobileMax") : undefined,
        );
        const tQuery = responsiveWidth(tWidth, width("tablet"), dWidth !== tWidth ? width("tabletMax") : undefined);
        const dQuery = responsiveWidth(dWidth, width("desktop"), extWidth !== dWidth ? width("desktopMax") : undefined);
        const extQuery = responsiveWidth(extWidth, width("extDesktop"));
        let q = mQuery;
        if (tWidth > mWidth) {
            q = q.concat(tQuery);
        }
        if (dWidth > tWidth) {
            q = q.concat(tQuery, dQuery);
        }
        if (extWidth > dWidth) {
            q = q.concat(tQuery, dQuery, extQuery);
        }
        return q;
    }
};
