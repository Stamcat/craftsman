"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "./InputWrapper";
import { DatePicker as ReactDatePicker, type DatePickerProps } from "react-date-picker";
import "../../styles/global/components/_reactDatePicker.scss";
import "../../styles/global/components/_reactCalendar.scss";

export type InputProps = DatePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
};

/**
 * This component implements react-international-phone, which relies on i18n to automatically format phone number inputs based on country.
 */
export const DatePicker: React.FC<InputProps> = ({
    label,
    id,
    labelPosition = "top",
    required = false,
    error,
    style,
    className,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    return (
        <InputWrapper id={inputId} className={clsx(className)} label={label} labelPosition={labelPosition} error={error} required={required} style={style}>
            <ReactDatePicker
                // calendarIcon={<IconCalendar color={color("black")} />}
                // clearIcon={clearIcon}
                {...props}
            />
        </InputWrapper>
    )

};
