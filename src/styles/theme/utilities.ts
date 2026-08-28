import type { CSSObject, SerializedStyles } from "./types";

function isSerializedStyles(value: CSSObject | SerializedStyles): value is SerializedStyles {
    return "styles" in value && "name" in value;
}

/**
 * Parses a legacy serialized style object into a plain CSSObject by reading the
 * compiled CSS string. Supports flat declarations only — nested rules and
 * at-rules are ignored. Traverses the linked list via `.next`.
 */
function serializedStylesToCSSObject(serialized: SerializedStyles): CSSObject {
    const result: Record<string, string> = {};
    let current: SerializedStyles | undefined = serialized;

    while (current) {
        const declarations = current.styles
            .split(";")
            .map((d: string) => d.trim())
            .filter((d: string) => d && !d.startsWith("label:"));

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
            const camelProperty = property.replace(/-([a-z])/g, (_match: string, letter: string) =>
                letter.toUpperCase(),
            );
            result[camelProperty] = value;
        }

        current = current.next;
    }

    return result;
}

export function toCSSObject(value: CSSObject | SerializedStyles): CSSObject {
    return isSerializedStyles(value) ? serializedStylesToCSSObject(value) : value;
}

function toKebabCase(property: string): string {
    if (property.startsWith("--")) {
        return property;
    }
    return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function normalizeNestedSelector(parent: string, selector: string): string {
    if (selector.startsWith("&")) {
        return selector.replace(/&/g, parent);
    }

    if (selector.startsWith(":")) {
        return `${parent}${selector}`;
    }

    if (selector.startsWith("[")) {
        return `${parent}${selector}`;
    }

    if (/^[>+~]/.test(selector)) {
        return `${parent} ${selector}`;
    }

    return `${parent} ${selector}`;
}

export function cssObjectToCssText(selector: string, value: CSSObject): string {
    const declarations: string[] = [];
    const nestedRules: string[] = [];

    for (const [key, ruleValue] of Object.entries(value)) {
        if (ruleValue === undefined) {
            continue;
        }

        if (typeof ruleValue === "object") {
            const nestedObject = ruleValue as CSSObject;

            if (key.startsWith("@")) {
                nestedRules.push(`${key} { ${cssObjectToCssText(selector, nestedObject)} }`);
                continue;
            }

            const nestedSelector = normalizeNestedSelector(selector, key);
            nestedRules.push(cssObjectToCssText(nestedSelector, nestedObject));
            continue;
        }

        declarations.push(`${toKebabCase(key)}: ${String(ruleValue)};`);
    }

    const baseRule = declarations.length > 0 ? `${selector} { ${declarations.join(" ")} }` : "";
    return [baseRule, ...nestedRules].filter(Boolean).join("\n");
}
