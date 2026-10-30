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
export type BuiltInWidthKey = z.infer<typeof LayoutWidthsSchema>;

/**
 * Augment via declaration merging to register custom `width()`/`theme.widths` keys with full
 * type safety, e.g. `declare module "@stamcat/craftsman/styles" { interface CraftsmanCustomWidths { sidebar: true } }`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CraftsmanCustomWidths {}

export type LayoutWidthsType = BuiltInWidthKey | keyof CraftsmanCustomWidths;

/**
 * Augment via declaration merging to register a brand-new named `scale()` utility function with
 * full type safety, e.g.
 * `declare module "@stamcat/craftsman/styles" { interface CraftsmanScales { shadow: "sm" | "md" } }`.
 * Unlike `CraftsmanCustomWidths` (new keys on the built-in `width()` scale), this registers an
 * entirely new scale — the general plugin point for utility functions craftsman doesn't ship
 * out of the box (shadow, radius, z-index, etc).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CraftsmanScales {}

export type ScaleName = keyof CraftsmanScales;

export type Width = Record<BuiltInWidthKey, number>;

export type Colors = Record<string, string>;
export type ColorType = "rgba" | "hex";
// This allows us to accept emotion styled where applicable
export type SerializedStyles = {
    name: string;
    styles: string;
    next?: SerializedStyles;
};

export const zTextInputExclusions = z.enum(["checkbox", "radio"]);
export type TextInputExclusions = z.infer<typeof zTextInputExclusions>;

export const zTextInputTypes = [
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
    "radio",
    "checkbox",
] as const;

export const zTextInputType = z.enum(zTextInputTypes);

export type TextInputType = z.infer<typeof zTextInputType>;

export const zLabelPosition = z.enum(["top", "left", "bottom", "right", "inside", "hidden"]);
export type LabelPosition = z.infer<typeof zLabelPosition>;

export const zCheckboxLabelPosition = zLabelPosition.exclude(["inside", "hidden"]);
export type CheckboxLabelPosition = z.infer<typeof zCheckboxLabelPosition>;

export const zRadioLabelPosition = zLabelPosition.extract(["left", "right"]);
export type RadioLabelPosition = z.infer<typeof zRadioLabelPosition>;

export const zInputNumberLabelPosition = zLabelPosition.exclude(["inside"]);
export type InputNumberLabelPosition = z.infer<typeof zInputNumberLabelPosition>;

export const ButtonType = z.enum(["primary", "secondary", "default", "text"]);
export type ButtonType = z.infer<typeof ButtonType>;

export const TextTags = z.enum(["h1", "h2", "h3", "h4", "h5", "p", "span", "div"]);
export type TextTags = z.infer<typeof TextTags>;

export const TextType = z.enum(["display", "heading", "paragraph", "caption", "small-title"]);
export type TextType = z.infer<typeof TextType>;

export const TextSize = z.enum(["xlarge", "large", "medium", "small", "xsmall"]);
export type TextSize = z.infer<typeof TextSize>;

export const CarouselPageType = z.enum(["dots", "numbers"]);
export type CarouselPageType = z.infer<typeof CarouselPageType>;

export const NoticeType = z.enum(["help", "info", "success", "error", "none"]);
export type NoticeType = z.infer<typeof NoticeType>;
