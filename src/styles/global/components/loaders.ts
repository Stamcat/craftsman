import z from "zod";
import type React from "react";

export const LoaderStyleSchema = z.enum([
    "dots",
    "dots-trace",
    // "dots-bounce",
    "dots-orbit",
    "dashes",
    "spinner",
    "swirl",
    "ball",
    "boxy",
    // "factory",
]);
export type LoaderStyle = z.infer<typeof LoaderStyleSchema>;
export type LoaderStyleDefinition = (color: string, width?: number) => React.CSSProperties;

// box-switch - https://css-loaders.com/shapes/ #5
export const loaders: Record<LoaderStyle, LoaderStyleDefinition> = {
    dots: (color: string, width = 100) => ({
        ["--_l5c" as string]: color,
        ["--_l5w" as string]: `${Math.round(width * 0.125)}px`,
        ["--_l5w2" as string]: `${Math.round(width * 0.16666)}px`,
        ["--_l5w3" as string]: `${Math.round(width * -0.16666)}px`,
    }),
    // "dots-bounce": (color: string, width = 60) => css`
    //     --_g: no-repeat radial-gradient(circle closest-side, ${color} 90%, #0000);
    //     --_gw: ${width}px;
    // `,
    "dots-trace": (color: string, width = 60) => ({
        ["--_dtc" as string]: color,
        ["--_dtw" as string]: `${width}px`,
    }),
    "dots-orbit": (color: string, width = 17) => ({
        ["--_doc" as string]: color,
        ["--_dow" as string]: `${width}px`,
    }),
    dashes: (color: string, width = 40) => ({
        ["--_dshc" as string]: color,
        ["--_dshw" as string]: `${width}px`,
        ["--_dshw2" as string]: `${Math.round(width / 4)}px`,
    }),
    spinner: (color: string, width = 50) => ({
        ["--_spnc" as string]: color,
        ["--_spnw" as string]: `${width}px`,
        ["--_spnw2" as string]: `${Math.round(width * 0.16)}px`,
    }),
    swirl: (color: string, width = 50) => ({
        ["--_swrlc" as string]: color,
        ["--_swrlw" as string]: `${width}px`,
        ["--_swrlw2" as string]: `${Math.round(width * 0.16)}px`,
    }),
    ball: (color: string, width = 50) => ({
        ["--_ballc" as string]: color,
        ["--_ballw" as string]: `${width}px`,
        ["--_ballw2" as string]: `${Math.round(width * 0.24)}px`,
    }),
    boxy: (color: string, width = 120) => ({
        ["--_boxc" as string]: color,
        ["--_boxw" as string]: `${width}px`,
        ["--_boxw2" as string]: `${Math.round(width * 0.16666)}px`,
    }),
    // factory: (color: string, width = 0) => css`
    //     --_ftyc: ${color};
    //     --_ftyw: ${width};
    // `,
};
