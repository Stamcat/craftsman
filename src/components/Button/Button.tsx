"use client";

import clsx from "clsx";
import { isEmpty } from "../../utilities/validations";
import { ButtonType, width } from "../../styles";

export type ButtonProps = React.ComponentProps<"button"> & {
    /** Primary - Call-To-Action, Text - use for non-anchored text buttons */
    variant?: ButtonType;
    /** Scale multiplier (0.1-10); affects padding, border-radius and font size, maintains font legibility at a minimum of 10px. default = 1 */
    size?: number;
    /** Optional style override using React CSSProperties. */
    styles?: React.CSSProperties;
};
/**
 * Button supports SCSS modules and regular classNames.<br />
 * Color scheme can be changed both by theme or by globalStyles button html element.<br />
 * If button is empty, it will return nothing. This prevents instances of "empty square" which can annoy the end user.
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const { type = "button", variant = "default", size, styles: styleOverride, className, style, ...rest } = props;
    const normalizedSize = typeof size === "number" ? Math.min(10, Math.max(0.1, size)) : undefined;
    const resolvedStyleOverride = isEmpty(styleOverride) ? undefined : styleOverride;
    const scaledStyle: React.CSSProperties = normalizedSize
        ? {
            borderRadius: `calc(var(--btn-border-radius) * ${normalizedSize})`,
            padding: `calc(var(--btn-pad-y) * ${normalizedSize}) calc(var(--btn-pad-x) * ${normalizedSize})`,
            fontSize: `max(10px, calc(${width("text")} * ${normalizedSize}))`,
        }
        : {};

    if (isEmpty(props.children)) {
        return <></>;
    }

    return (
        <button
            type={type}
            className={clsx(variant, className)}
            style={{ ...scaledStyle, ...resolvedStyleOverride, ...style }}
            {...rest}
        />
    );
};
