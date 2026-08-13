"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFloating, autoUpdate, offset, flip, shift } from "@floating-ui/react-dom";
import { IosPickerItem } from './TimePickerWheel'
import "./TimePicker.scss";
import { getAmPmLabels, getUnitLabel, is24HourFormat } from '../../utilities';
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { padTime, parseTimeString, resolveHasValue, resolveLocale, resolveTime, resolveTimeFormat, to24Hour } from "./utilities";
import { isEmpty, isTouchDevice } from "../../utilities/validations";
import { TimePickerDisplay } from "./TimePickerDisplay";

type PropType = Omit<React.ComponentProps<"input">, "type"> & LabeledInput & {
    locale?: Intl.LocalesArgument;
    format?: 24 | 12;
    labels?: {
        hour?: "string";
        minute?: "string";
    }
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
export const TimePicker = (props: PropType) => {
    const { labels, locale, format, value, defaultValue, onChange, label, labelPosition, error, required, name } = props;

    // hooks
    const nativeTimeRef = useRef<HTMLInputElement>(null);
    const [referenceEl, setReferenceEl] = useState<Element | null>(null);
    const [floatingEl, setFloatingEl] = useState<HTMLElement | null>(null);
    const { floatingStyles } = useFloating({
        placement: "bottom-start",
        strategy: "absolute",
        whileElementsMounted: autoUpdate,
        middleware: [offset(4), flip(), shift()],
        elements: { reference: referenceEl, floating: floatingEl },
    });
    const [internalHours, setHours] = useState<number | null>(() =>
        isEmpty(defaultValue) ? null : parseTimeString(defaultValue)[0]
    );
    const [internalMinutes, setMinutes] = useState<number | null>(() =>
        isEmpty(defaultValue) ? null : parseTimeString(defaultValue)[1]
    );
    const [visible, setVisible] = useState(false);

    // derived state
    const resolvedLocale = resolveLocale(locale);
    // controlled mode: derive from value prop; uncontrolled: use internal state
    const [hours, minutes] = resolveTime(value, internalHours, internalMinutes);
    const hasValue = resolveHasValue(value, internalHours);
    const minuteHasValue = resolveHasValue(value, internalMinutes);
    // fixed value: consumer provided value with no onChange handler
    const isReadOnly = !isEmpty(value) && !onChange;
    const isMobile = isTouchDevice();
    const timeFormat = resolveTimeFormat(format, is24HourFormat(resolvedLocale));
    const hourOffset = timeFormat === 12 ? 1 : 0;
    const amPmLabels = timeFormat === 12 ? getAmPmLabels(resolvedLocale) : null;
    const amPmIndex = hours >= 12 ? 1 : 0;
    const hourIndex = timeFormat === 12 ? (hours % 12 + 11) % 12 : hours;
    const timeValue = `${padTime(hours)}:${padTime(minutes)}`;

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

    const handleHourClear = () => {
        setHours(null);
        onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleMinuteClear = () => {
        setMinutes(null);
        onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleNativeTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEmpty(e.target.value)) {
            setHours(null);
            setMinutes(null);
            onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
        } else {
            const [h, m] = parseTimeString(e.target.value);
            setHours(h);
            setMinutes(m);
            dispatchChange(h, m);
        }
    };

    const handleToggleVisible = () => {
        if (isMobile) {
            (nativeTimeRef.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.();
        } else {
            setVisible((v) => !v);
        }
    };

    const dispatchChange = (h: number, m: number) => {
        onChange?.({ target: { value: `${padTime(h)}:${padTime(m)}` } } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleHourSelect = (index: number) => {
        const display = index + hourOffset;
        const h = to24Hour(display, hours >= 12, timeFormat === 12);
        setHours(h);
        dispatchChange(h, minutes);
    };

    const handleMinuteSelect = (index: number) => {
        setMinutes(index);
        dispatchChange(hours, index);
    };

    const handleAmPmSelect = (index: number) => {
        const isPM = index === 1;
        const currentIsPM = hours >= 12;
        if (isPM === currentIsPM) { return; }
        const next = isPM ? hours + 12 : hours - 12;
        setHours(next);
        dispatchChange(next, minutes);
    };

    const handleHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const n = parseInt(e.target.value, 10);
        const max = timeFormat === 12 ? 12 : 23;
        const min = timeFormat === 12 ? 1 : 0;
        if (isNaN(n) || n < min || n > max) { return; }
        const h = to24Hour(n, hours >= 12, timeFormat === 12);
        setHours(h);
        dispatchChange(h, minutes);
    };

    const handleMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const n = parseInt(e.target.value, 10);
        if (isNaN(n) || n < 0 || n > 59) { return; }
        setMinutes(n);
        dispatchChange(hours, n);
    };

    const handleAmPmInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleAmPmSelect(parseInt(e.target.value, 10));
    };

    return (
        <div className="timePicker__wrapper" ref={setReferenceEl}>
            {name && <input type="hidden" name={name} value={timeValue} readOnly />}
            {isMobile && <input ref={nativeTimeRef} type="time" value={hasValue ? timeValue : ""} onChange={handleNativeTimeChange} style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }} aria-hidden="true" tabIndex={-1} />}
            <InputWrapper label={label} labelPosition={labelPosition} error={error} required={required} value={timeValue}>
                <TimePickerDisplay
                    hours={hours}
                    minutes={minutes}
                    hourHasValue={hasValue}
                    minuteHasValue={minuteHasValue}
                    isReadOnly={isReadOnly}
                    timeFormat={timeFormat}
                    amPmLabels={amPmLabels}
                    visible={visible}
                    onToggleVisible={handleToggleVisible}
                    onClear={{ hour: handleHourClear, minute: handleMinuteClear }}
                    onChange={{
                        hour: handleHourInput,
                        minute: handleMinuteInput,
                        amPm: handleAmPmInput,
                    }}
                />
            </InputWrapper>
            {visible && <div className="timePicker" ref={setFloatingEl} style={floatingStyles}>
                <IosPickerItem
                    slideCount={timeFormat}
                    perspective="left"
                    loop={true}
                    offset={hourOffset}
                    selectedIndex={wheelIndex(hasValue, hourIndex)}
                    onSelect={handleHourSelect}
                    disabled={isReadOnly}
                    label={getUnitLabel(resolvedLocale, "hour", labels?.hour)}
                />
                <IosPickerItem
                    slideCount={60}
                    perspective="right"
                    loop={true}
                    selectedIndex={wheelIndex(minuteHasValue, minutes)}
                    onSelect={handleMinuteSelect}
                    disabled={isReadOnly}
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
                        disabled={isReadOnly}
                        label=""
                    />
                )}
            </div>}
        </div>
    );
};

