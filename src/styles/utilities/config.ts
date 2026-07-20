import { defaultColors, defaultWidths } from "./constants";
import type { CraftsmanConfig, ResponsiveWidth, CraftsmanStyleConfig, Width } from "./types";

const defaultConfig: CraftsmanConfig = {
    colors: defaultColors,
    widths: defaultWidths,
};

let runtimeConfig: CraftsmanConfig = {
    colors: { ...defaultConfig.colors },
    widths: { ...defaultConfig.widths },
};

function resolveWidths(widths: Width): ResponsiveWidth {
    return {
        ...widths,
        mobileMax: widths.tablet - 0.00001,
        tabletMax: widths.desktop - 0.00001,
        desktopMax: widths.extDesktop - 0.00001,
    };
}

export function setCraftsmanConfig(config: CraftsmanStyleConfig) {
    const colorOverrides = Object.entries(config.colors ?? {}).reduce<Record<string, string>>((acc, [key, value]) => {
        if (typeof value === "string") {
            acc[key] = value;
        }
        return acc;
    }, {});
    const widthOverrides = config.widths ? { ...config.widths } : {};

    runtimeConfig = {
        colors: {
            ...runtimeConfig.colors,
            ...colorOverrides,
        },
        widths: {
            ...runtimeConfig.widths,
            ...widthOverrides,
        },
    };
}

export function resetCraftsmanConfig() {
    runtimeConfig = { ...defaultConfig };
}

export function getCraftsmanConfig(): { colors: Record<string, string>; widths: ResponsiveWidth } {
    return {
        colors: { ...runtimeConfig.colors },
        widths: resolveWidths(runtimeConfig.widths),
    };
}
