import z from "zod";

export const BaseWidthSchema = z.enum(["gutter", "column"]);
export const ScreenWidthSchema = z.enum(["tablet", "desktop", "extDesktop"]);
export const MaxScreenWidthSchema = z.enum(["mobileMax", "tabletMax", "desktopMax"]);
export const BreakpointSchema = z.enum([
    ...ScreenWidthSchema.options,
    ...MaxScreenWidthSchema.options,
    "mobileOnly",
    "tabletOnly",
    "mobileTablet",
    "desktopOnly",
]);
export const LayoutWidthsSchema = z.enum([
    ...BaseWidthSchema.options,
    ...ScreenWidthSchema.options,
    ...MaxScreenWidthSchema.options,
    "text",
]);

export type BaseWidth = z.infer<typeof BaseWidthSchema>;
export type ScreenWidth = z.infer<typeof ScreenWidthSchema>;
export type MaxScreenWidth = z.infer<typeof MaxScreenWidthSchema>;
export type Breakpoint = z.infer<typeof BreakpointSchema>;
export type LayoutWidthsType = z.infer<typeof LayoutWidthsSchema>;

export type Width = Record<LayoutWidthsType, number>;

export type Colors = Record<string, string>;
export type ColorType = "rgba" | "hex";
