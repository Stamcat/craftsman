import type { ColorKey } from "../utilities/color";
import type { componentSelectors } from "./components";
import type { LayoutWidthsType, CraftsmanScales, ScaleName } from "../../utilities/types";

export type ColorVariableName = `--${ColorKey}`;

export type CSSObject = {
    [key: string]: string | number | CSSObject | undefined;
};

export type SerializedStyles = {
    name: string;
    styles: string;
    next?: SerializedStyles;
};

export type RegisteredComponent = keyof typeof componentSelectors;

export type ComponentThemeOverrides = {
    [K in RegisteredComponent]?: CSSObject | SerializedStyles | string;
};
export type Colors = Partial<Record<ColorVariableName, string>>;

export type WidthOverrides = Partial<Record<LayoutWidthsType, number>>;

/** Override registered `scale()` CSS variables (e.g. `--shadow-sm`). Values are raw CSS, not px numbers. */
export type ScaleOverrides = {
    [N in ScaleName]?: Partial<Record<CraftsmanScales[N] & string, string>>;
};

export type Theme = {
    colors?: Colors;
    /** Override default width/breakpoint CSS variables (e.g. tablet, desktop, gutter). Values are in px. */
    widths?: WidthOverrides;
    /** Set CSS variables for scales registered via `CraftsmanScales` declaration merging (e.g. shadow, radius). */
    scales?: ScaleOverrides;
    /** Writes to cf-base layer for custom base styles */
    base?: CSSObject | SerializedStyles | string;
    root?: CSSObject | SerializedStyles | string;
    components?: ComponentThemeOverrides;
};

export type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export type AppTheme = Record<string, Theme>;
