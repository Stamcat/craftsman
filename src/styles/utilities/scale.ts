import type { CraftsmanScales, ScaleName } from "../../utilities/types";

/**
 * Generic utility-function plugin point: resolves any scale registered via declaration-merging
 * `CraftsmanScales` to a CSS variable reference. Like `color()`, it never validates at runtime —
 * the actual value must come from `theme.scales`, a manual `:root { --name-key: ...; }`
 * declaration, or the Sass `$extra-scales` equivalent.
 *
 * @example
 * declare module "@stamcat/craftsman/styles" {
 *   interface CraftsmanScales { shadow: "sm" | "md"; radius: "sm" | "md" | "lg"; }
 * }
 *
 * scale("shadow", "sm"); // => "var(--shadow-sm)"
 */
export function scale<N extends ScaleName>(name: N, key: CraftsmanScales[N] & string): string {
    return `var(--${name}-${key})`;
}
