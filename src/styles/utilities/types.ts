type BaseLayoutWidth = "column" | "gutter" | "extDesktop" | "extNav" | "desktop" | "tablet" | "extMobile";
type MaxLayoutWidth = "mobileMax" | "tabletMax" | "desktopMax";

export type Breakpoint =
    "mobile" | "tablet" | "desktop" | "extDesktop" | "mobileOnly" | "tabletOnly" | "mobileTablet" | "desktopOnly";

export type LayoutWidthsType = BaseLayoutWidth | MaxLayoutWidth;
export type Width = Record<"text" | BaseLayoutWidth, number>;
export type ResponsiveWidth = Width & Record<MaxLayoutWidth, number>;
export type Colors = Record<string, string>;
export type ColorType = "rgba" | "hex";

export type CraftsmanConfig = {
    colors: Colors;
    widths: Width;
};
export type CraftsmanStyleConfig = Partial<{ colors: Partial<Colors>; widths: Partial<Width> }>;
