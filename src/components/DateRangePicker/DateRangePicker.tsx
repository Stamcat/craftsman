"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import "./DateRangePicker.scss";
import "../DatePicker/ReactCalendar.scss";
import { FaX, FaRegCalendar } from "react-icons/fa6";
import { DateRangePicker as ReactDateRangePicker, type DateRangePickerProps as ReactDateRangePickerProps } from "@wojtekmaj/react-daterange-picker";

export type DateRangePickerProps = ReactDateRangePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
};

/**
 * This component shamelessly and directly implements <a href='https://projects.wojtekmaj.pl/react-daterange-picker/'>react-datepicker</a>.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
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
        <InputWrapper id={inputId} className={clsx("dateRangePicker", className)} label={label} labelPosition={labelPosition} error={error} required={required} style={style}>
            <ReactDateRangePicker
                calendarIcon={<FaRegCalendar size={16} />}
                clearIcon={<FaX size={14} />}
                {...props}
            />
        </InputWrapper>
    )

};
