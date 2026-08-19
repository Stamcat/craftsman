"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { DateTimePicker as ReactDateTimePicker, type DateTimePickerProps as ReactDateTimePickerProps } from "react-datetime-picker";
import "./DateTimePicker.scss";
import "../DatePicker/ReactCalendar.scss";
import { FaRegCalendar, FaX } from "react-icons/fa6";
import { TimePickerDisplay } from "../TimePicker/TimePickerDisplay";
import { resolveLocale } from "../TimePicker/utilities";
import { formatTime } from "../../utilities/validations";

export type DateTimePickerProps = ReactDateTimePickerProps & LabeledInput & {
    id?: string;
    style?: React.CSSProperties;
    format?: 24 | 12;
    labels?: {
        hour?: string;
        minute?: string;
    };
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
    locale,
    labels,
    format,
    value,
    onChange,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // hooks
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // state
    const [clockOpen, setClockOpen] = useState(false);

    // derived state
    const resolvedLocale = resolveLocale(locale);

    // actions
    useEffect(() => {
        if (!clockOpen) { return undefined; }
        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (wrapperRef.current?.contains(target)) {
                return;
            }
            setClockOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
        };
    }, [clockOpen]);

    const openTimeWidget = () => {
        if (value instanceof Date) {
            setClockOpen(true);
            return;
        }

        // no date selected yet - focus the date field so the calendar opens instead of the time wheel
        const dateInput = wrapperRef.current?.querySelector<HTMLInputElement>("input[name=\"day\"]");
        dateInput?.focus();
    };

    const onFocusTime = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        if (event.target instanceof HTMLInputElement) {
            openTimeWidget();
        }
    };

    const onChangeTime = (time: string) => {
        const [hoursRaw, minutesRaw] = time.split(":");
        const hours = Number(hoursRaw);
        const minutes = Number(minutesRaw);
        if (Number.isNaN(hours) || Number.isNaN(minutes)) {
            return;
        }

        const baseDate = value instanceof Date ? new Date(value) : new Date();
        baseDate.setHours(hours, minutes, 0, 0);
        onChange?.(baseDate);
    };

    return (
        <div ref={wrapperRef} className="dateTimePicker__wrapper">
            <InputWrapper
                id={inputId}
                onFocus={onFocusTime}
                className={clsx(className, "dateTimePicker")}
                label={label}
                labelPosition={labelPosition}
                error={error}
                required={required}
                style={style}
                value={value instanceof Date ? value.toISOString() : undefined}
            >
                <ReactDateTimePicker
                    isClockOpen={false}
                    onClockOpen={openTimeWidget}
                    onClockClose={() => { }}
                    onCalendarOpen={() => setClockOpen(false)}
                    calendarIcon={<FaRegCalendar size={16} />}
                    clearIcon={<FaX size={14} />}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {clockOpen && (
                    <div className="dateTimePicker__time-display">
                        <TimePickerDisplay
                            value={formatTime(value, locale)}
                            onChange={onChangeTime}
                            locale={resolvedLocale}
                            labels={labels}
                            format={format}
                            visible={clockOpen}
                        />
                    </div>
                )}
            </InputWrapper>
        </div>
    );
};

