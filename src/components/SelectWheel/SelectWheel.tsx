"use client";

import React, { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { useFloating, autoUpdate, offset, flip, shift } from "@floating-ui/react-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Button } from "../Button/Button";
import { InputWrapper, type LabeledInput } from "../Input/InputWrapper";
import { isEmpty } from "../../utilities/validations";
import { SelectWheelDisplay } from "./SelectWheelDisplay";
import "./SelectWheel.scss";

export type SelectWheelOption = {
    value: string;
    label: string;
};

export type SelectWheelProps = LabeledInput & {
    id?: string;
    name?: string;
    className?: string;
    style?: React.CSSProperties;
    options: SelectWheelOption[];
    value?: string;
    onChange?: (value: string) => void;
    /** Optional static label displayed alongside the wheel, e.g. a unit of measurement like "pounds" */
    staticLabel?: string;
    /** Wraps the wheel from the last option back to the first and vice versa. Default: false */
    loop?: boolean;
    disabled?: boolean;
};

/**
 * Functions like a dropdown, but presents its options as a scrollable wheel, matching
 * the wheel used by `TimePicker`. Pair with `staticLabel` to show a trailing unit
 * alongside the selected value, e.g. "180 pounds".
 */
export const SelectWheel: React.FC<SelectWheelProps> = (props) => {
    const {
        label,
        labelPosition = "top",
        required = false,
        error,
        width,
        id,
        name,
        className,
        style,
        options,
        value,
        onChange,
        staticLabel,
        loop = false,
        disabled,
    } = props;

    const generatedId = useId();
    const inputId = id || generatedId;

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

    // state
    const [visible, setVisible] = useState(false);

    // derived state
    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption && !isEmpty(staticLabel)
        ? `${selectedOption.label} ${staticLabel}`
        : selectedOption?.label ?? "";

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

    const onFocusField = () => {
        if (disabled) { return; }
        setVisible(true);
    };

    const onKeyDownField = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === "Escape") {
            setVisible(false);
        }
    };

    return (
        <div
            className={clsx("selectWheel", className)}
            ref={setReferenceEl}
            onKeyDown={onKeyDownField}
            data-value-suffix={staticLabel}
        >
            {name && <input type="hidden" name={name} value={value ?? ""} readOnly />}
            <InputWrapper label={label} labelPosition={labelPosition} error={error} required={required} width={width} style={style}>
                <div className="selectWheel__field">
                    <input
                        id={inputId}
                        className="input"
                        readOnly
                        disabled={disabled}
                        value={displayValue}
                        onFocus={onFocusField}
                    />
                    <Button
                        type="button"
                        variant="text"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Hide options" : "Show options"}
                        aria-pressed={visible}
                        disabled={disabled}
                        className="input-view-toggle"
                    >
                        {visible ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                    </Button>
                </div>
            </InputWrapper>
            <SelectWheelDisplay
                options={options}
                value={value}
                onChange={onChange}
                staticLabel={staticLabel}
                loop={loop}
                visible={visible}
                disabled={disabled}
                floatingRef={setFloatingEl}
                style={floatingStyles}
            />
        </div>
    );
};
