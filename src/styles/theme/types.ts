import type { ColorKey } from "../utilities/color";
import type { componentSelectors } from "./components";

export type ColorVariableName = `--${ColorKey}`;

export type CSSObject = {
    [key: string]: string | number | CSSObject | undefined;
};

export type LegacySerializedStyles = {
    name: string;
    styles: string;
    next?: LegacySerializedStyles;
};

export type RegisteredComponent = keyof typeof componentSelectors;

export type ComponentThemeOverrides = {
    [K in RegisteredComponent]?: CSSObject | LegacySerializedStyles | string;
};
export type Colors = Partial<Record<ColorVariableName, string>>;

export type Theme = {
    colors?: Colors;
    root?: CSSObject | LegacySerializedStyles;
    components?: ComponentThemeOverrides;
};

export type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export type AppTheme = Record<string, Theme>;
