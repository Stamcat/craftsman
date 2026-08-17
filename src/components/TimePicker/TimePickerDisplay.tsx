import React from "react";
import { getAmPmLabels, getUnitLabel, is24HourFormat, isEmpty } from "../../utilities/validations";
import { IosPickerItem } from "./TimePickerWheel";
import { padTime, parseTimeString, resolveLocale, resolveTimeFormat, to24Hour } from "./utilities";

type TimePickerDisplayProps = {
    value?: unknown;
    onChange?: (val: string) => void;
    locale?: Intl.LocalesArgument;
    format?: 24 | 12;
    labels?: {
        hour?: string;
        minute?: string;
    };
    visible?: boolean;
    floatingRef?: (node: HTMLElement | null) => void;
    style?: React.CSSProperties;
};

const wheelIndex = (hasValue: boolean, index: number): number | undefined =>
    hasValue ? index : undefined;

export const TimePickerDisplay: React.FC<TimePickerDisplayProps> = (props) => {
    const { value, onChange, locale, format, labels, visible = false, floatingRef, style } = props;

    const resolvedLocale = resolveLocale(locale);
    const [hours, minutes] = parseTimeString(value);
    const hasValue = !isEmpty(value);
    const timeFormat = resolveTimeFormat(format, is24HourFormat(resolvedLocale));
    const hourOffset = timeFormat === 12 ? 1 : 0;
    const amPmLabels = timeFormat === 12 ? getAmPmLabels(resolvedLocale) : null;
    const amPmIndex = hours >= 12 ? 1 : 0;
    const hourIndex = timeFormat === 12 ? (hours % 12 + 11) % 12 : hours;

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

    if (!visible) {
        return null;
    }

    return (
        <div className="timePicker" ref={floatingRef} style={style}>
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
    );
};
