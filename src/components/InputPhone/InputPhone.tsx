"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { PhoneInput, type PhoneInputProps, type PhoneInputRefType } from "react-international-phone";
import "./InputPhone.scss";

export type InputProps = PhoneInputProps & LabeledInput & {
    id?: string;
};

/**
 * This component implements react-international-phone, which relies on i18n to automatically format phone number inputs based on country.
 */
export const InputPhone: React.FC<InputProps> = ({
    label,
    id,
    labelPosition = "top",
    required = false,
    defaultCountry = "us",
    error,
    style,
    className,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const phoneInputRef = React.useRef<PhoneInputRefType>(null);

    // Prevent the wrapping label from forwarding its click to the country selector button (which would open the dropdown); focus the number input instead.
    const handleLabelClick: React.MouseEventHandler<HTMLLabelElement> = (event) => {
        const numberInput = phoneInputRef.current;
        const target = event.target as HTMLElement;
        if (!numberInput || target === numberInput || target.closest("button")) {
            return;
        }
        event.preventDefault();
        numberInput.focus();
    };

    return (
        <InputWrapper id={inputId} className={clsx("inputPhone", className)} label={label} labelPosition={labelPosition} error={error} required={required} style={style} onLabelClick={handleLabelClick}>
            <PhoneInput
                defaultCountry={defaultCountry}
                {...props}
                ref={phoneInputRef}
            />
        </InputWrapper>
    )

};
