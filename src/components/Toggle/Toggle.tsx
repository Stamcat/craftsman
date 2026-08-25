"use client";

import clsx from "clsx";
import { Input, type InputProps } from "../Input/Input";
import "./Toggle.scss";

export type ToggleProps = Omit<InputProps, "type" | "preAdornment" | "endAdornment"> & {
    width?: number;
};

/**
 * This is literally just a checkbox with some styles.
 * It really can be that simple.
 */
export const Toggle: React.FC<ToggleProps> = ({
    labelPosition = "right",
    className,
    style,
    width = 40,
    ...props
}) => {
    return (
        <Input
            type="checkbox"
            labelPosition={labelPosition}
            className={clsx("toggle", className)}
            endAdornment={<span className="toggle-slider" />}
            style={{ ...style, "--toggle-width": `${width}px` } as React.CSSProperties}
            {...props}
        />
    );
};
