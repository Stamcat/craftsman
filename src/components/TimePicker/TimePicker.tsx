"use client";

import React, { useState, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift } from "@floating-ui/react-dom";
import { TimePicker as ReactTimePicker, type TimePickerProps as ReactTimePickerProps } from "react-time-picker";
import { FaClock, FaRegClock, FaX } from "react-icons/fa6";
import { Button } from "../Button/Button";
import "./TimePicker.scss";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { resolveLocale } from "./utilities";
import { TimePickerDisplay } from "./TimePickerDisplay";

type TimePickerProps = Omit<ReactTimePickerProps, "locale" | "format"> & LabeledInput & {
    locale?: Intl.LocalesArgument;
    format?: 24 | 12;
    labels?: {
        hour?: string;
        minute?: string;
    };
}

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

    const onFocusTime = (event: React.FocusEvent<HTMLDivElement, Element>) => {
        if (event.target instanceof HTMLInputElement) {
            setVisible(true);
        }
    }
    return (
        <div className="timePicker__wrapper" ref={setReferenceEl} onFocus={onFocusTime}>
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
                        clearIcon={<FaX size={14} />}

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
            <TimePickerDisplay
                value={value}
                onChange={(val) => onChange?.(val)}
                locale={resolvedLocale}
                labels={labels}
                format={format}
                visible={visible}
                floatingRef={setFloatingEl}
                style={floatingStyles}
            />
        </div>
    );
};

