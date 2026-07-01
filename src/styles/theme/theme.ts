import { ThemeProvider as EmotionThemeProvider, css, type SerializedStyles } from "@emotion/react";
import React, { createElement } from "react";
import type { ComponentThemeOverrides, RegisteredComponent, Theme, ThemeProviderProps } from "./types";
import { componentSelectors } from "./components";
import { defaultAppTheme } from "./constants";
import { colors } from "../global/colors";

function buildComponentThemeOverrides(components?: ComponentThemeOverrides): SerializedStyles[] {
    const componentOverrides: SerializedStyles[] = [];

    (Object.keys(componentSelectors) as RegisteredComponent[]).forEach((componentName) => {
        const defaultThemeStyles = defaultAppTheme.components?.[componentName];
        const componentThemeStyles = components?.[componentName];

        if (!defaultThemeStyles && !componentThemeStyles) {
            return;
        }

        componentOverrides.push(
            css({
                [componentSelectors[componentName]]: css`
                    ${defaultThemeStyles}
                    ${componentThemeStyles}
                `,
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
            ...defaultAppTheme.root,
            ...theme.colors,
            ...theme.root,
        },
    });

    return css([colors, root, ...buildComponentThemeOverrides(theme.components)]);
}
