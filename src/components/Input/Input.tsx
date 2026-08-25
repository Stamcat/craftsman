"use client";

import { useId } from "react";
import clsx from "clsx";
import { isEmpty } from "../../utilities/validations";
import { InputWrapper, type LabeledInput } from "./InputWrapper";
import { type TextInputType } from "../../utilities/types";

export type InputProps = React.ComponentProps<"input"> & LabeledInput & {
    /** Exclude Checkbox and Radio, we have dedicated components for those. */
    type?: TextInputType;
};

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const Input: React.FC<InputProps> = (props) => {
    const {
        label,
        id,
        labelPosition = "top",
        required = false,
        type = "text",
        error,
        endAdornment,
        preAdornment,
        style,
        className,
        ...rest
    } = props;
    const generatedId = useId();
    const inputId = id || generatedId;
    return (
        <InputWrapper className={className} label={label} labelPosition={labelPosition} error={error} required={required} style={style}>
            <span className="input-field" data-has-end-adornment={!isEmpty(endAdornment)} data-has-pre-adornment={!isEmpty(preAdornment)}>
                {!isEmpty(preAdornment) && <span className="input-pre-adornment">{preAdornment}</span>}
                <input id={inputId} type={type} className={clsx("input", type)} {...rest} />
                {!isEmpty(endAdornment) && <span className="input-end-adornment">{endAdornment}</span>}
            </span>
        </InputWrapper>
    )

};
