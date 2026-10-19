"use client";

import clsx from "clsx";
import "./Skeleton.scss";

export type SkeletonVariant = "text" | "circle" | "rect";

export type SkeletonProps = React.ComponentProps<"span"> & {
    variant?: SkeletonVariant;
    width?: number | string;
    height?: number | string;
    /** Shimmer animation duration in seconds (default: 1.4) */
    duration?: number;
};

/**
 * Generic shimmering placeholder block for skeleton loading states.
 */
export const Skeleton: React.FC<SkeletonProps> = (props) => {
    const { variant = "rect", width, height, duration, className, style, ...rest } = props;
    const durationStyle = duration ? ({ "--skeleton-duration": `${duration}s` } as React.CSSProperties) : undefined;

    return (
        <span
            className={clsx("skeleton", `skeleton--${variant}`, className)}
            style={{ width, height, ...durationStyle, ...style }}
            {...rest}
        />
    );
};
