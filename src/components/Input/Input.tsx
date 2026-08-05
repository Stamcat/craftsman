"use client";

import { useId } from "react";
import clsx from "clsx";
import { isEmpty } from "../../utilities/validations";
import styles from "./Input.module.scss";
import { InputWrapper, type LabeledInput } from "./InputWrapper";
import type { TextInputType } from "../../utilities/types";

export type InputProps = React.ComponentProps<"input"> & LabeledInput & {
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
    endAdornment,
    style,
    className,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    return (
        <InputWrapper className={className} label={label} labelPosition={labelPosition} error={error} required={required} style={style}>
            <span className={styles.inputField} data-has-end-adornment={!isEmpty(endAdornment)}>
                <input id={inputId} type={type} className={clsx(styles.input, type)} {...props} />
                {!isEmpty(endAdornment) && <span className={styles.inputAdornment}>{endAdornment}</span>}
            </span>
        </InputWrapper>
    )

};
