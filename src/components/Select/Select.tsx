"use client";

import { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { isEmpty } from "../../utilities/validations";

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
    inputStyle,
    preAdornment,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <InputWrapper label={label} labelPosition={labelPosition} error={error} required={required} className={clsx("select", className)} style={style}>
            <span className="input-field" data-has-pre-adornment={!isEmpty(preAdornment)}>
                {!isEmpty(preAdornment) && <span className="input-pre-adornment">{preAdornment}</span>}
                <select id={inputId} className="input" style={inputStyle} {...props}>
                    {options.map((opt, i) => (
                        <option key={`${inputId}-opt-${i}`} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </span>
        </InputWrapper>
    )
}
