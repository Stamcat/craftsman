import type { CSSObject, SerializedStyles } from "@emotion/react";

function isSerializedStyles(value: CSSObject | SerializedStyles): value is SerializedStyles {
    return "styles" in value && "name" in value;
}

/**
 * Parses a SerializedStyles object into a plain CSSObject by reading the
 * compiled CSS string. Supports flat declarations only — nested rules and
 * at-rules are ignored. Traverses the SerializedStyles linked list via `.next`.
 */
function serializedStylesToCSSObject(serialized: SerializedStyles): CSSObject {
    const result: Record<string, string> = {};
    let current: SerializedStyles | undefined = serialized;

    while (current) {
        const declarations = current.styles
            .split(";")
            .map((d) => d.trim())
            .filter((d) => d && !d.startsWith("label:"));

        for (const declaration of declarations) {
            const colonIndex = declaration.indexOf(":");
            if (colonIndex === -1) {
                continue;
            }
            const property = declaration.slice(0, colonIndex).trim();
            const value = declaration.slice(colonIndex + 1).trim();
            if (!property || !value) {
                continue;
            }
            const camelProperty = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
            result[camelProperty] = value;
        }

        current = current.next;
    }

    return result;
}

export function toCSSObject(value: CSSObject | SerializedStyles): CSSObject {
    return isSerializedStyles(value) ? serializedStylesToCSSObject(value) : value;
}
