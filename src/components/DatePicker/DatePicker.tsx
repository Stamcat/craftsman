"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { DatePicker as ReactDatePicker, type DatePickerProps as ReactDatePickerProps } from "react-date-picker";
import "./DatePicker.scss";
import "./ReactCalendar.scss";
import { FaX, FaRegCalendar } from "react-icons/fa6";

export type DatePickerProps = ReactDatePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
};

/**
 * This component shamelessly and directly implements <a href='https://projects.wojtekmaj.pl/react-date-picker/'>react-datepicker</a>.
 */
export const DatePicker: React.FC<DatePickerProps> = ({
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
                calendarIcon={<FaRegCalendar size={16} />}
                clearIcon={<FaX size={14} />}
                {...props}
            />
        </InputWrapper>
    )

};
