"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { DateTimePicker as ReactDateTimePicker, type DateTimePickerProps as ReactDateTimePickerProps } from "react-datetime-picker";
// import "./DatePicker.scss";
// import "./ReactCalendar.scss";

export type DateTimePickerProps = ReactDateTimePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
};

/**
 * This component shamelessly and directly implements <a href='https://projects.wojtekmaj.pl/react-date-picker/'>react-datepicker</>.
 */
export const DateTimePicker: React.FC<DateTimePickerProps> = ({
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
            <ReactDateTimePicker
                // calendarIcon={<IconCalendar color={color("black")} />}
                // clearIcon={clearIcon}
                {...props}
            />
        </InputWrapper>
    )

};
