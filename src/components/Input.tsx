"use client";

import { useId } from "react";
import clsx from "clsx";
import { isEmpty } from "../utilities/validations";
import type { LabelPosition, TextInputType } from "../utilities/types";
import styles from "./Input.module.scss";

export type InputProps = React.ComponentProps<"input"> & {
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
    /** Exclude Checkbox and Radio, we have dedicated components for those. */
    type?: TextInputType;
};

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const Input: React.FC<InputProps> = ({
    label,
    id,
    labelPosition = "top",
    required = false,
    type = "text",
    error,
    styles: styleOverride,
    className,
    style,
    endAdornment,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasInput = !isEmpty(props.value) || !isEmpty(props.defaultValue);
    const resolvedStyleOverride = isEmpty(styleOverride) ? undefined : styleOverride;
    const inputElement = (
        <span className={styles.inputField} data-has-end-adornment={!isEmpty(endAdornment)}>
            <input id={inputId} type={type} className={clsx(styles.input, type)} {...props} />
            {!isEmpty(endAdornment) && <span className={styles.inputAdornment}>{endAdornment}</span>}
        </span>
    );

    return (
        <div
            data-label-position={labelPosition}
            data-required={required}
            data-has-input={hasInput}
            className={clsx(styles.wrapper, className)}
            style={{ ...resolvedStyleOverride, ...style }}
        >
            {isEmpty(label) ? (
                inputElement
            ) : (
                <label>
                        {labelPosition !== "hidden" && <div className={styles.inputLabel}>{label}</div>}
                        {inputElement}
                </label>
            )}
            {!isEmpty(error) && <div className={styles.error}>{error}</div>}
        </div>
    );
};
