import type { CSSObject } from "@emotion/react";
import type { ColorKey } from "../../utilities/color";
import type { componentSelectors } from "./constants";

export type ColorVariableName = `--${ColorKey}`;

export type RegisteredComponent = keyof typeof componentSelectors;

type ComponentThemeOverrides = {
    [K in RegisteredComponent]?: CSSObject;
};

export type Theme = {
    colors?: Partial<Record<ColorVariableName, string>>;
    components?: ComponentThemeOverrides;
};

export type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export type AppTheme = Record<string, Theme>;
