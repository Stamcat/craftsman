"use client";

import clsx from "clsx";
import { loaders, type LoaderStyle } from "./types";
import styles from "./loaders.module.scss";
import { isEmpty } from "../../utilities/validations";

export type LoaderProps = React.ComponentProps<"div"> & {
    type: LoaderStyle;
    color?: string;
    width?: number;
    styles?: React.CSSProperties;
}

/**
 * Loaders are pure CSS picked from https://css-loaders.com/ <br />
 * For simplicity, we stick to one primary color & use gray/white as an alternate. <br />
 * We've adjusted the style values to dynamically change based on your inputs.<br />
 * We intend to expand selections in the future
 */
export const Loader: React.FC<LoaderProps> = (props) => {
    const { type, color = "black", width, styles: styleOverride, className, style, ...rest } = props;
    const resolvedStyleOverride = isEmpty(styleOverride) ? undefined : styleOverride;
    const loaderStyleVars = loaders[type](color, width);

    return (
        <div
            className={clsx(styles[type], className)}
            style={{ ...loaderStyleVars, ...resolvedStyleOverride, ...style }}
            {...rest}
        />
    );
}
