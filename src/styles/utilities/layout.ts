import { toCssString } from "../../utilities";
import {
    LayoutWidthsSchema,
    type Breakpoint,
    type BuiltInWidthKey,
    type LayoutWidthsType,
    type SerializedStyles,
} from "../../utilities/types";
import { defaultWidths, rootFontSize } from "./constants";

export const widths: Record<BuiltInWidthKey, string> = Object.fromEntries(
    LayoutWidthsSchema.options.map((w) => [w, `var(--w-${w}, ${defaultWidths[w]}px)`]),
) as Record<BuiltInWidthKey, string>;

export const media = {
    get mobile() {
        return `(min-width: 0px)`;
    },
    get mobileMax() {
        return `(max-width: ${defaultWidths.mobileMax}px)`;
    },
    get tablet() {
        return `(min-width: ${defaultWidths.tablet}px)`;
    },
    get tabletMax() {
        return `(max-width: ${defaultWidths.tabletMax}px)`;
    },
    get desktop() {
        return `(min-width: ${defaultWidths.desktop}px)`;
    },
    get desktopMax() {
        return `(max-width: ${defaultWidths.desktopMax}px)`;
    },
    get extDesktop() {
        return `(min-width: ${defaultWidths.extDesktop}px)`;
    },
    get mobileOnly() {
        return `(min-width: 0px) and (max-width: ${defaultWidths.mobileMax}px)`;
    },
    get tabletOnly() {
        return `(min-width: ${defaultWidths.tablet}px) and (max-width: ${defaultWidths.tabletMax}px)`;
    },
    get mobileTablet() {
        return `(min-width: 0px) and (max-width: ${defaultWidths.tabletMax}px)`;
    },
    get desktopOnly() {
        return `(min-width: ${defaultWidths.desktop}px) and (max-width: ${defaultWidths.desktopMax}px)`;
    },
};
export type WidthUnit = "px" | "rem" | "em" | "number";

/**
 * Returns width based on key.
 *
 * Built-in keys resolve to `var(--w-{key}, {defaultPx})` using the compiled-in default. Custom
 * keys registered via declaration merging (see `CraftsmanCustomWidths`) have no compiled-in
 * default — they resolve to a bare `var(--w-{key})` and must be set via `theme.widths` or a
 * global `--w-{key}` CSS variable.
 *
 * `unit` controls the returned CSS value: `"px"` (default) keeps the stored px value, `"number"`
 * strips the unit entirely (for contexts like `line-height`/`--my-count` that need a raw number),
 * and `"rem"`/`"em"` convert the stored px value using `rootFontSize` (default `16`).
 * @param w - key of the stored width
 * @param multiplier
 * @param unit
 * @returns
 */
export const width = (w: LayoutWidthsType, multiplier: number = 1, unit: WidthUnit = "px"): string => {
    const value = widths[w as BuiltInWidthKey] ?? `var(--w-${w})`;

    const numberExpr =
        w === "column"
            ? `((${value} / 1px) * ${multiplier}) + ((${widths.gutter} / 1px) * ${multiplier - 1})`
            : multiplier === 1
              ? `${value} / 1px`
              : `(${value} / 1px) * ${multiplier}`;

    if (unit === "number") {
        return `calc(${numberExpr})`;
    }

    if (unit === "rem" || unit === "em") {
        return `calc((${numberExpr}) / ${rootFontSize} * 1${unit})`;
    }

    if (w === "column") {
        return `calc((${value} * ${multiplier}) + (${widths.gutter} * ${multiplier - 1}))`;
    }

    return multiplier === 1 ? value : `calc(${value} * ${multiplier})`;
};

/**
 * Creates responsive breakpoints styles
 * @param bp
 * @param styles
 * @returns
 */
export const breakpoint = (bp: Breakpoint, styles: string | SerializedStyles) => {
    return `@media ${media[bp]} { ${toCssString(styles)} }`;
};
