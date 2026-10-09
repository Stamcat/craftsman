import React from "react";
import { IosPickerItem } from "./IosPickerItem";
import type { SelectWheelOption } from "./SelectWheel";

type SelectWheelDisplayProps = {
    options: SelectWheelOption[];
    value?: string;
    onChange?: (value: string) => void;
    staticLabel?: string;
    loop?: boolean;
    visible?: boolean;
    disabled?: boolean;
    floatingRef?: (node: HTMLElement | null) => void;
    style?: React.CSSProperties;
};

export const SelectWheelDisplay: React.FC<SelectWheelDisplayProps> = (props) => {
    const { options, value, onChange, staticLabel, loop = false, visible = false, disabled, floatingRef, style } = props;

    const selectedIndex = options.findIndex((opt) => opt.value === value);

    const handleSelect = (index: number) => {
        const option = options[index];
        if (!option) { return; }
        onChange?.(option.value);
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="selectWheel__display" ref={floatingRef} style={style}>
            <IosPickerItem
                slideCount={options.length}
                perspective="center"
                loop={loop}
                slides={options.map((opt) => opt.label)}
                selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}
                onSelect={handleSelect}
                label={staticLabel ?? ""}
                disabled={disabled}
            />
        </div>
    );
};
