"use client";
import { useFloating, autoUpdate, offset, flip, shift, type Placement, type Strategy } from "@floating-ui/react-dom";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import "./Tooltip.scss";

export type TooltipProps = {
    anchor: React.ReactNode;
    content: React.ReactNode;
    placement?: Placement;
    strategy?: Strategy;
    showContent?: "hover" | "click";
    anchorStyles?: React.CSSProperties;
    contentStyles?: React.CSSProperties;
}

/**
 * Tooltip uses floating-ui to allow you to anchor any element to any other element as a tooltip.
 * Tooltip styling is minimal and gives you flexibility to customize.
 * @param props 
 */
export const Tooltip: React.FC<TooltipProps> = (props) => {
    const { showContent = "hover" } = props;
    const [referenceEl, setReferenceEl] = useState<Element | null>(null);
    const [floatingEl, setFloatingEl] = useState<HTMLElement | null>(null);
    const { floatingStyles, placement } = useFloating({
        placement: props.placement ?? "bottom-start",
        strategy: props.strategy ?? "absolute",
        whileElementsMounted: autoUpdate,
        middleware: [offset(12), flip(), shift()],
        elements: { reference: referenceEl, floating: floatingEl },
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!visible || showContent !== "click") { return undefined; }
        const handlePointerDown = (e: PointerEvent) => {
            if (referenceEl?.contains(e.target as Node)) { return; }
            if (floatingEl?.contains(e.target as Node)) { return; }
            setVisible(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => { document.removeEventListener("pointerdown", handlePointerDown); };
    }, [visible, showContent, referenceEl, floatingEl]);

    const handleMouseEnter = () => { if (showContent === "hover") { setVisible(true); } };
    const handleMouseLeave = () => { if (showContent === "hover") { setVisible(false); } };
    const handleClick = () => { if (showContent === "click") { setVisible((v) => !v); } };

    return (
        <div className={clsx("tooltip")}>
            <div className={clsx("tooltip__anchor")} ref={setReferenceEl} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} style={props.anchorStyles}>{props.anchor}</div>
            {visible && (
                <div className={clsx("tooltip__floating")} ref={setFloatingEl} data-placement={placement} style={{ ...floatingStyles, ...props.contentStyles }}>
                    {props.content}
                </div>
            )}
        </div>
    )
}
