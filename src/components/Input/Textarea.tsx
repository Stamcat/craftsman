"use client";

import { InputWrapper, type LabeledInput } from "./InputWrapper";
import styles from "./Input.module.scss";
import clsx from "clsx";
import { useId } from "react";

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
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <InputWrapper label={label} className={clsx(styles.textarea, className)} labelPosition={labelPosition} error={error} required={required} style={style}>
            <textarea id={inputId} className={clsx(styles.input)} {...props} />
        </InputWrapper>
    )
}
