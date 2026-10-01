"use client";

import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { useId } from "react";
import clsx from "clsx";

export type TextareaProps = React.ComponentProps<"textarea"> & LabeledInput;
/**
 * Radio Button simply implements Input, but it has some guardrails in place to maintain correct of usage of Radio button elements.
 */
export const Textarea: React.FC<TextareaProps> = ({ 
    labelPosition = "top",
    id, 
    label, 
    error,
    required,
    className,
    style,
    value,
    defaultValue,
    inputStyle,
    inputClassName,
    labelStyle,
    labelClassName,
    width,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <InputWrapper label={label} className={className} labelPosition={labelPosition} error={error} required={required} style={style} value={value} defaultValue={defaultValue} labelStyle={labelStyle} labelClassName={labelClassName} width={width}>
            <textarea id={inputId} className={clsx("input", inputClassName)} value={value} defaultValue={defaultValue} style={inputStyle} {...props} />
        </InputWrapper>
    )
}
