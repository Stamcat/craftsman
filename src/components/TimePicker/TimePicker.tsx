"use client";

import React, { useState, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift } from "@floating-ui/react-dom";
import { TimePicker as ReactTimePicker, type TimePickerProps as ReactTimePickerProps } from "react-time-picker";
import { FaClock, FaRegClock } from "react-icons/fa6";
import { IosPickerItem } from './TimePickerWheel';
import { Button } from "../Button/Button";
import "./TimePicker.scss";
import "react-time-picker/dist/TimePicker.css";
import { getAmPmLabels, getUnitLabel, is24HourFormat } from '../../utilities';
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { padTime, parseTimeString, resolveLocale, resolveTimeFormat, to24Hour } from "./utilities";
import { isEmpty } from "../../utilities/validations";

type TimePickerProps = Omit<ReactTimePickerProps, "locale"> & LabeledInput & {
    locale?: Intl.LocalesArgument;
    format?: 24 | 12;
    labels?: {
        hour?: string;
        minute?: string;
    };
}

const wheelIndex = (hasValue: boolean, index: number): number | undefined =>
    hasValue ? index : undefined;

/**
 * Custom time picker element, displays a wheel to scroll through time values.
 * Supports internationalization with custom locale, if no locale is passed it will use browser's native locale.
 * Locale will automatically resolve labels and time formatting using react-intl standards. <br /><br />
 * You can pass in your own custom labels, but I highly recommend sticking to i18n standards.
 * 
 */
export const TimePicker: React.FC<TimePickerProps> = (props) => {
    const { labels, locale, format, value, onChange, label, labelPosition, error, required, name, ...rest } = props;

    // hooks
    const [referenceEl, setReferenceEl] = useState<Element | null>(null);
    const [floatingEl, setFloatingEl] = useState<HTMLElement | null>(null);
    const { floatingStyles } = useFloating({
        placement: "bottom-start",
        strategy: "absolute",
        whileElementsMounted: autoUpdate,
        middleware: [offset(4), flip(), shift()],
        elements: { reference: referenceEl, floating: floatingEl },
    });
    const [visible, setVisible] = useState(false);

    // derived state
    const resolvedLocale = resolveLocale(locale);
    const [hours, minutes] = parseTimeString(value);
    const hasValue = !isEmpty(value);
    const timeFormat = resolveTimeFormat(format, is24HourFormat(resolvedLocale));
    const hourOffset = timeFormat === 12 ? 1 : 0;
    const amPmLabels = timeFormat === 12 ? getAmPmLabels(resolvedLocale) : null;
    const amPmIndex = hours >= 12 ? 1 : 0;
    const hourIndex = timeFormat === 12 ? (hours % 12 + 11) % 12 : hours;

    // actions
    useEffect(() => {
        if (!visible) { return undefined; }
        const handlePointerDown = (e: PointerEvent) => {
            if (referenceEl?.contains(e.target as Node)) { return; }
            if (floatingEl?.contains(e.target as Node)) { return; }
            setVisible(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => { document.removeEventListener("pointerdown", handlePointerDown); };
    }, [visible, referenceEl, floatingEl]);

    const handleHourSelect = (index: number) => {
        const h = to24Hour(index + hourOffset, hours >= 12, timeFormat === 12);
        onChange?.(`${padTime(h)}:${padTime(minutes)}`);
    };

    const handleMinuteSelect = (index: number) => {
        onChange?.(`${padTime(hours)}:${padTime(index)}`);
    };

    const handleAmPmSelect = (index: number) => {
        const isPM = index === 1;
        const currentIsPM = hours >= 12;
        if (isPM === currentIsPM) { return; }
        const next = isPM ? hours + 12 : hours - 12;
        onChange?.(`${padTime(next)}:${padTime(minutes)}`);
    };

    return (
        <div className="timePicker__wrapper" ref={setReferenceEl} onFocus={(e) => { if (e.target instanceof HTMLInputElement) { setVisible(true); } }}>
            {name && <input type="hidden" name={name} value={typeof value === "string" ? value : ""} readOnly />}
            <InputWrapper label={label} labelPosition={labelPosition} error={error} required={required}>
                <div className="timePicker__field">
                    <ReactTimePicker
                        {...rest}
                        value={value}
                        onChange={onChange}
                        locale={resolvedLocale}
                        required={required}
                        disableClock={true}
                    />
                    <Button
                        type="button"
                        variant="text"
                        onClick={() => setVisible(v => !v)}
                        aria-label={visible ? "Hide time picker" : "Show time picker"}
                        aria-pressed={visible}
                        className="input-view-toggle"
                    >
                        {visible ? <FaClock size={16} /> : <FaRegClock size={16} />}
                    </Button>
                </div>
            </InputWrapper>
            {visible && (
                <div className="timePicker" ref={setFloatingEl} style={floatingStyles}>
                    <IosPickerItem
                        slideCount={timeFormat}
                        perspective="left"
                        loop={true}
                        offset={hourOffset}
                        selectedIndex={wheelIndex(hasValue, hourIndex)}
                        onSelect={handleHourSelect}
                        label={getUnitLabel(resolvedLocale, "hour", labels?.hour)}
                    />
                    <IosPickerItem
                        slideCount={60}
                        perspective="right"
                        loop={true}
                        selectedIndex={wheelIndex(hasValue, minutes)}
                        onSelect={handleMinuteSelect}
                        label={getUnitLabel(resolvedLocale, "minute", labels?.minute)}
                    />
                    {timeFormat === 12 && amPmLabels && (
                        <IosPickerItem
                            slideCount={2}
                            perspective="center"
                            loop={false}
                            slides={amPmLabels}
                            selectedIndex={wheelIndex(hasValue, amPmIndex)}
                            onSelect={handleAmPmSelect}
                            label=""
                        />
                    )}
                </div>
            )}
        </div>
    );
};

