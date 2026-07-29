import type { ComponentThemeOverrides, RegisteredComponent, Theme } from "./types";
import { componentSelectors } from "./components";
import { cssObjectToCssText, toCSSObject } from "./utilities";
import { colors, widths } from "../global/variables";

const classStylesCache = new Map<string, Record<string, string> | null>();

function readClassDeclarationsFromDocument(className: string): Record<string, string> | undefined {
    if (typeof document === "undefined") {
        return undefined;
    }

    const selector = `.${className}`;
    const declarations: Record<string, string> = {};
    let found = false;

    const readRules = (rules: CSSRuleList) => {
        for (const rule of Array.from(rules)) {
            if (rule instanceof CSSStyleRule) {
                const selectors = rule.selectorText.split(",").map((value) => value.trim());

                // Resolve only the base class selector so declarations can be copied to component selectors.
                if (!selectors.includes(selector)) {
                    continue;
                }

                found = true;
                for (const property of Array.from(rule.style)) {
                    declarations[property] = rule.style.getPropertyValue(property);
                }
                continue;
            }

            if (rule instanceof CSSGroupingRule) {
                readRules(rule.cssRules);
            }
        }
    };

    for (const styleSheet of Array.from(document.styleSheets)) {
        try {
            if (styleSheet.cssRules) {
                readRules(styleSheet.cssRules);
            }
        } catch {
            // Ignore cross-origin stylesheets; they are not readable from JS.
        }
    }

    return found ? declarations : undefined;
}

function resolveThemeClassStyleObject(className: string): Record<string, string> | undefined {
    if (classStylesCache.has(className)) {
        const cached = classStylesCache.get(className);
        return cached ?? undefined;
    }

    const resolved = readClassDeclarationsFromDocument(className);
    classStylesCache.set(className, resolved ?? null);
    return resolved;
}

function buildComponentThemeOverrides(components?: ComponentThemeOverrides): string[] {
    const componentOverrides: string[] = [];

    (Object.keys(componentSelectors) as RegisteredComponent[]).forEach((componentName) => {
        const componentThemeStyles = components?.[componentName];

        if (!componentThemeStyles) {
            return;
        }

        if (typeof componentThemeStyles === "string") {
            const resolvedClassStyles = resolveThemeClassStyleObject(componentThemeStyles);

            if (!resolvedClassStyles) {
                return;
            }

            componentOverrides.push(cssObjectToCssText(componentSelectors[componentName], resolvedClassStyles));
            return;
        }

        componentOverrides.push(
            cssObjectToCssText(componentSelectors[componentName], toCSSObject(componentThemeStyles)),
        );
    });

    return componentOverrides;
}

export function themeBuilder(theme: Theme) {
    const root = cssObjectToCssText(":root", {
        ...(theme.colors || {}),
        ...(theme.root ? toCSSObject(theme.root) : {}),
    });

    const themeRules = [root, ...buildComponentThemeOverrides(theme.components)].filter(Boolean).join("\n");

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
