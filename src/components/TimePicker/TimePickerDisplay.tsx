import { padTime, toDisplayHour, toDisplayInputValue } from "./utilities";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { FaClock, FaRegClock } from "react-icons/fa6";

type TimePickerDisplayProps = {
    hours: number;
    minutes: number;
    hourHasValue: boolean;
    minuteHasValue: boolean;
    isReadOnly: boolean;
    timeFormat: 12 | 24;
    amPmLabels: string[] | null;
    visible: boolean;
    onToggleVisible: () => void;
    onClear: { hour: () => void; minute: () => void };
    onChange: {
        hour: (e: React.ChangeEvent<HTMLInputElement>) => void;
        minute: (e: React.ChangeEvent<HTMLInputElement>) => void;
        amPm: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    };
};

export const TimePickerDisplay = (props: TimePickerDisplayProps) => {
    const { hours, minutes, hourHasValue, minuteHasValue, isReadOnly, timeFormat, amPmLabels, visible, onToggleVisible, onClear, onChange } = props;

    // derived state
    const displayHour = toDisplayHour(hours, timeFormat === 12);
    const amPmIndex = hours >= 12 ? 1 : 0;
    const handleHourClearKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" || e.key === "Delete") { onClear.hour(); }
    };
    const handleMinuteClearKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" || e.key === "Delete") { onClear.minute(); }
    };

    return (
        <div className="timePicker__display">
            <Input
                type="number"
                min={timeFormat === 12 ? 1 : 0}
                max={timeFormat === 12 ? 12 : 23}
                value={toDisplayInputValue(hourHasValue, displayHour)}
                placeholder="--"
                readOnly={isReadOnly}
                onChange={onChange.hour}
                onKeyDown={handleHourClearKey}
            />
            <span>:</span>
            <Input
                type="number"
                min={0}
                max={59}
                value={toDisplayInputValue(minuteHasValue, padTime(minutes))}
                placeholder="--"
                readOnly={isReadOnly}
                onChange={onChange.minute}
                onKeyDown={handleMinuteClearKey}
            />
            {timeFormat === 12 && amPmLabels && (
                <Select
                    value={String(amPmIndex)}
                    onChange={onChange.amPm}
                    disabled={isReadOnly}
                    options={amPmLabels.map((v, i) => ({ value: String(i), label: v }))}
                />
            )}
            <Button
                type="button"
                variant="text"
                onClick={onToggleVisible}
                aria-label={visible ? "Hide picker" : "Show picker"}
                aria-pressed={visible}
                className="input-view-toggle"
            >
                {visible ? <FaClock size={16} /> : <FaRegClock size={16} />}
            </Button>
        </div>
    );
};
