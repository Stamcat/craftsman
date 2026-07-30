import type { ColorKey } from "../utilities/color";
import type { componentSelectors } from "./components";
import type { LayoutWidthsType } from "../../utilities/types";

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

export type WidthOverrides = Partial<Record<LayoutWidthsType, number>>;

export type Theme = {
    colors?: Colors;
    /** Override default width/breakpoint CSS variables (e.g. tablet, desktop, gutter). Values are in px. */
    widths?: WidthOverrides;
    root?: CSSObject | LegacySerializedStyles | string;
    components?: ComponentThemeOverrides;
};

export type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export type AppTheme = Record<string, Theme>;
