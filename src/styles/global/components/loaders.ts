import { css, type SerializedStyles } from "@emotion/react";
import z from "zod";

export const LoaderStyleSchema = z.enum([
    "dots",
    "dots-trace",
    "dots-bounce",
    "dots-orbit",
    "dashes",
    "spinner",
    "swirl",
    "ball",
    "boxy",
    "factory",
]);
export type LoaderStyle = z.infer<typeof LoaderStyleSchema>;
export type LoaderStyleDefinition = (color: string, width?: number) => SerializedStyles;

// box-switch - https://css-loaders.com/shapes/ #5
export const loaders: Record<LoaderStyle, LoaderStyleDefinition> = {
    dots: (color: string, width = 100) => css`
        --_l5c: ${color};
        --_l5w: ${Math.round(width * 0.125)}px;
        --_l5w2: ${Math.round(width * 0.16666)}px;
        --_l5w3: ${Math.round(width * -0.16666)}px;
    `,
    "dots-bounce": (color: string, width = 60) => css`
        --_g: no-repeat radial-gradient(circle closest-side, ${color} 90%, #0000);
        --_gw: ${width}px;
    `,
    "dots-trace": (color: string, width = 60) => css`
        --_dtc: ${color};
        --_dtw: ${width}px;
    `,
    "dots-orbit": (color: string, width = 17) => css`
        --_doc: ${color};
        --_dow: ${width}px;
    `,
    dashes: (color: string, width = 40) => css`
        --_dshc: ${color};
        --_dshw: ${width}px;
        --_dshw2: ${Math.round(width / 4)}px;
    `,
    spinner: (color: string, width = 50) => css`
        --_spnc: ${color};
        --_spnw: ${width}px;
        --_spnw2: ${Math.round(width * 0.16)}px;
    `,
    swirl: (color: string, width = 50) => css`
        --_swrlc: ${color};
        --_swrlw: ${width}px;
        --_swrlw2: ${Math.round(width * 0.16)}px;
    `,
    ball: (color: string, width = 50) => css`
        --_ballc: ${color};
        --_ballw: ${width}px;
        --_ballw2: ${Math.round(width * 0.24)}px;
    `,
    boxy: (color: string, width = 120) => css`
        --_boxc: ${color};
        --_boxw: ${width}px;
        --_boxw2: ${Math.round(width * 0.16666)}px;
    `,
    factory: (color: string, width = 0) => css`
        --_ftyc: ${color};
        --_ftyw: ${width};
    `,
};
