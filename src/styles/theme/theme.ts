import { ThemeProvider as EmotionThemeProvider, css, type CSSObject } from "@emotion/react";
import React, { createElement } from "react";
import type { ColorVariableName, RegisteredComponent, Theme, ThemeProviderProps } from "./types";
import { componentSelectors } from "./constants";

function themeToCssVariables(theme: Theme): Partial<Record<ColorVariableName, string>> {
    const colorVariables = theme.colors ? { ...theme.colors } : {};

    return {
        ...colorVariables,
    };
}

function buildComponentThemeOverrides(theme: Theme): Record<string, CSSObject> {
    const componentOverrides: Record<string, CSSObject> = {};

    (Object.keys(componentSelectors) as RegisteredComponent[]).forEach((componentName) => {
        const componentThemeStyles = theme.components?.[componentName];

        if (!componentThemeStyles) {
            return;
        }

        componentOverrides[componentSelectors[componentName]] = componentThemeStyles;
    });

    return componentOverrides;
}
export function CraftsmanThemeProvider({ theme, children }: ThemeProviderProps) {
    return createElement(
        EmotionThemeProvider as React.ComponentType<{ theme: Theme; children?: React.ReactNode }>,
        { theme },
        children,
    );
}


export function buildThemeOverride(theme: Theme) {
    return css({
        ":root": themeToCssVariables(theme),
        ...buildComponentThemeOverrides(theme),
    });
}
