"use client";

import { useState } from "react";
import clsx from "clsx";
import { isEmpty } from "../../utilities/validations";
import type { LabelPosition } from "../../utilities/types";
import "./Input.scss";

export type LabeledInput = {
    /** String is recommended, use ReactNode to for custom elements */
    label?: string | React.ReactNode;
    /** Default position is top. Strongly recommend text label for accessibility, use 'hidden' if you don't want to display it. */
    labelPosition?: LabelPosition;
    /** String will render error with text, true changes only field style, use ReactNode to for custom elements */
    error?: string | boolean | React.ReactNode;
    /** Shows Required '*' if true */
    required?: boolean;
    /** Optional trailing element rendered inside the input field wrapper. This can be a button, icon, etc */
    endAdornment?: React.ReactNode;
    preAdornment?: React.ReactNode;
    /** Fires on click of the wrapping <label> element. Use to override the browser's default behavior of forwarding the click to the first focusable child. */
    onLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
};

export type InputWrapperProps = React.ComponentProps<"input" | "textarea" | "select"> & LabeledInput;

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const InputWrapper: React.FC<InputWrapperProps> = ({
    label,
    labelPosition = "top",
    required = false,
    error,
    className,
    style,
    children,
    value,
    defaultValue,
    onLabelClick
}) => {
    const isControlled = value !== undefined;
    const [uncontrolledHasInput, setUncontrolledHasInput] = useState(!isEmpty(defaultValue));
    const hasInput = isControlled ? !isEmpty(value) : uncontrolledHasInput;

    // reads the live DOM value so uncontrolled fields (defaultValue only, no onChange) update as the user types
    const handleFieldInput: React.FormEventHandler<HTMLDivElement> = (event) => {
        if (isControlled) { return; }
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        setUncontrolledHasInput(!isEmpty(target.value));
    };

    return (
        <div
            data-label-position={labelPosition}
            data-required={required}
            data-has-input={hasInput}
            className={clsx("input-wrapper", className)}
            style={style}
            onInput={handleFieldInput}
            onChange={handleFieldInput}
        >
            {isEmpty(label) ? (
                children
            ) : (
                    <label onClick={onLabelClick}>
                        {labelPosition !== "hidden" && <div className="input-label">{label}</div>}
                        {children}
                </label>
            )}
            {!isEmpty(error) && <div className="input-error">{error}</div>}
        </div>
    );
};
