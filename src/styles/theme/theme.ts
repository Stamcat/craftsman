import type { CSSObject, ComponentThemeOverrides, SerializedStyles, RegisteredComponent, Theme } from "./types";
import { componentSelectors } from "./components";
import { cssObjectToCssText, toCSSObject } from "./utilities";
import { colors, widths } from "../global/variables";

function buildRootStyle(root: Theme["root"]): string | undefined {
    if (!root) {
        return undefined;
    }

    if (typeof root === "string") {
        const value = root.trim();
        return value.includes("{") ? value : `:root { ${value} }`;
    }

    return cssObjectToCssText(":root", toCSSObject(root));
}

function buildComponentStyle(selector: string, styles: CSSObject | SerializedStyles | string): string {
    if (typeof styles === "string") {
        const value = styles.trim();
        return value.includes("{") ? value : `${selector} { ${value} }`;
    }

    return cssObjectToCssText(selector, toCSSObject(styles));
}

function buildComponentThemeOverrides(components?: ComponentThemeOverrides): string[] {
    return (Object.keys(componentSelectors) as RegisteredComponent[])
        .map((componentName) => {
            const styles = components?.[componentName];
            return styles ? buildComponentStyle(componentSelectors[componentName], styles) : undefined;
        })
        .filter((value): value is string => Boolean(value));
}

function buildWidthOverrides(widths?: Theme["widths"]): string | undefined {
    if (!widths || Object.keys(widths).length === 0) {
        return undefined;
    }
    const vars = Object.entries(widths)
        .map(([key, value]) => `--w-${key}: ${value}px;`)
        .join(" ");
    return `:root { ${vars} }`;
}

export function themeBuilder(theme: Theme) {
    const themeRules = [
        cssObjectToCssText(":root", { ...(theme.colors || {}) }),
        buildWidthOverrides(theme.widths),
        buildRootStyle(theme.root),
        ...buildComponentThemeOverrides(theme.components),
    ]
        .filter(Boolean)
        .join("\n");

    return [
        `:root { ${widths} ${colors} }`,
        "@layer craftsman-base, craftsman-theme;",
        "@layer craftsman-theme {",
        themeRules,
        "}",
    ]
        .filter(Boolean)
        .join("\n");
}
