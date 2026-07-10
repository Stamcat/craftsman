import type { CSSObject, SerializedStyles } from "@emotion/react";
import type { ColorKey } from "../utilities/color";
import type { componentSelectors } from "./components";

export type ColorVariableName = `--${ColorKey}`;

export type RegisteredComponent = keyof typeof componentSelectors;

export type ComponentThemeOverrides = {
    [K in RegisteredComponent]?: CSSObject | SerializedStyles | string;
};;
export type Colors = Partial<Record<ColorVariableName, string>>;

export type Theme = {
    colors?: Colors;
    root?: CSSObject | SerializedStyles;
    components?: ComponentThemeOverrides;
};

export type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export type AppTheme = Record<string, Theme>;
