"use client";

import { useId } from "react";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";

export type SelectOption = {
    value: string;
    selected?: boolean;
    disabled?: boolean;
    label: string;
};

export type SelectProps = React.ComponentProps<"select"> & LabeledInput & {
    options?: { label: string; value: string }[];
};

export const Select: React.FC<SelectProps> = ({
    label,
    id,
    labelPosition = "top",
    required = false,
    error,
    options = [],
    className,
    style,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <InputWrapper label={label} labelPosition={labelPosition} error={error} required={required} className={className} style={style}>
            <select id={inputId} {...props}>
                {options.map((opt, i) => (
                    <option key={`${inputId}-opt-${i}`} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </InputWrapper>
    )
}
