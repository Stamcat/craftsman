import { ThemeProvider as EmotionThemeProvider, css, type SerializedStyles } from "@emotion/react";
import React, { createElement } from "react";
import type { ComponentThemeOverrides, RegisteredComponent, Theme, ThemeProviderProps } from "./types";
import { componentSelectors } from "./components";
import { toCSSObject } from "./utilities";
import { colors } from "../global/variables";

function buildComponentThemeOverrides(components?: ComponentThemeOverrides): SerializedStyles[] {
    const componentOverrides: SerializedStyles[] = [];

    (Object.keys(componentSelectors) as RegisteredComponent[]).forEach((componentName) => {
        const componentThemeStyles = components?.[componentName];

        if (!componentThemeStyles) {
            return;
        }
        componentOverrides.push(
            css({
                [componentSelectors[componentName]]: {
                    ...(componentThemeStyles ? toCSSObject(componentThemeStyles) : {}),
                },
            }),
        );
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

export function themeBuilder(theme: Theme) {
    const root = css({
        ":root": {
            ...theme.colors,
            ...theme.root,
        },
    });

    return css([colors, root, ...buildComponentThemeOverrides(theme.components)]);
}
