"use client";

import clsx from "clsx";
import { isEmpty } from "../../utilities/validations";
import type { LabelPosition } from "../../utilities/types";
import styles from "./Input.module.scss";

export type LabeledInput = {
    /** String is recommended, use ReactNode to for custom elements */
    label?: string | React.ReactNode;
    /** Default position is top. Strongly recommend text label for accessibility, use 'hidden' if you don't want to display it. */
    labelPosition?: LabelPosition;
    /** String will render error with text, true changes only field style, use ReactNode to for custom elements */
    error?: string | boolean | React.ReactNode;
    /** Shows Required '*' if true */
    required?: boolean;
    /** Optional wrapper styles using React CSSProperties. */
    styles?: React.CSSProperties;
    /** Optional trailing element rendered inside the input field wrapper. This can be a button, icon, etc */
    endAdornment?: React.ReactNode;
};

export type InputWrapperProps = React.ComponentProps<"input" | "textarea"> & LabeledInput;

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const InputWrapper: React.FC<InputWrapperProps> = ({
    label,
    labelPosition = "top",
    required = false,
    error,
    styles: styleOverride,
    className,
    style,
    children,
    value,
    defaultValue
}) => {
    const hasInput = !isEmpty(value) || !isEmpty(defaultValue);
    const resolvedStyleOverride = isEmpty(styleOverride) ? undefined : styleOverride;
    return (
        <div
            data-label-position={labelPosition}
            data-required={required}
            data-has-input={hasInput}
            className={clsx(styles.wrapper, className)}
            style={{ ...resolvedStyleOverride, ...style }}
        >
            {isEmpty(label) ? (
                children
            ) : (
                <label>
                        {labelPosition !== "hidden" && <div className={styles.inputLabel}>{label}</div>}
                        {children}
                </label>
            )}
            {!isEmpty(error) && <div className={styles.error}>{error}</div>}
        </div>
    );
};
