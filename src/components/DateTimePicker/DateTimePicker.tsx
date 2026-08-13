"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { DateTimePicker as ReactDateTimePicker, type DateTimePickerProps as ReactDateTimePickerProps } from "react-datetime-picker";
import "../DatePicker/DatePicker.scss";
import "../DatePicker/ReactCalendar.scss";

export type DateTimePickerProps = ReactDateTimePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
};

const formatTime = (value: DateTimePickerProps["value"]): string => {
    if (!(value instanceof Date)) { return "--:--"; }
    return `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
};

/**
 * This component shamelessly and directly implements <a href='https://projects.wojtekmaj.pl/react-datetime-picker/'>react-datetime-picker</a>.
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
    const [clockOpen, setClockOpen] = useState(false);

    return (
        <InputWrapper id={inputId} className={clsx(className)} label={label} labelPosition={labelPosition} error={error} required={required} style={style}>
            <ReactDateTimePicker
                {...props}
                isClockOpen={false}
                onClockOpen={() => setClockOpen(true)}
                onClockClose={() => setClockOpen(false)}
            />
            {clockOpen && (
                <div className="datetimepicker__custom-clock">
                    {formatTime(props.value)}
                </div>
            )}
        </InputWrapper>
    );
};

