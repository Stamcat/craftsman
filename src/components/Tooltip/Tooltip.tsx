"use client";
import { useFloating, autoUpdate, offset, flip, shift, type Placement, type Strategy } from "@floating-ui/react-dom";
import clsx from "clsx";
import React, { useEffect, useId, useState } from "react";
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
    const contentId = useId();
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
    const handleFocus = () => { setVisible(true); };
    const handleBlur = () => { setVisible(false); };
    const handleClick = () => { if (showContent === "click") { setVisible((v) => !v); } };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") { setVisible(false); }
        if (showContent === "click" && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setVisible((v) => !v);
        }
    };

    return (
        <div className={clsx("tooltip")}>
            <div
                className={clsx("tooltip__anchor")}
                ref={setReferenceEl}
                tabIndex={0}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-describedby={visible ? contentId : undefined}
                style={props.anchorStyles}
            >{props.anchor}</div>
            {visible && (
                <div id={contentId} role="tooltip" className={clsx("tooltip__floating")} ref={setFloatingEl} data-placement={placement} style={{ ...floatingStyles, ...props.contentStyles }}>
                    {props.content}
                </div>
            )}
        </div>
    )
}

