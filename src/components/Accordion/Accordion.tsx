"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { FaAngleUp } from "react-icons/fa6";
import { isEmpty } from "../../utilities/validations";
import "./Accordion.scss";

export type AccordionItemType = {
    /** Stable identity for the item; auto-generated from the list index if omitted. */
    id?: string;
    header: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
};

export type AccordionProps = Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> & {
    items: AccordionItemType[];
    /** Allow more than one item open at once. default = false (opening an item closes any other open item) */
    multiple?: boolean;
    /** Controlled set of open item ids. Omit to let Accordion manage its own state. */
    expanded?: string[];
    /** Initial open item ids when uncontrolled. */
    defaultExpanded?: string[];
    onChange?: (expanded: string[]) => void;
};

/**
 * Accordion follows the WAI-ARIA Accordion pattern: each header is a button inside a heading element that
 * toggles `aria-expanded` and reveals a `role="region"` panel. Keyboard support (Tab, Enter/Space,
 * Arrow Up/Down, Home/End) mirrors the navigation model of a native &lt;select&gt;.
 */
export const Accordion: React.FC<AccordionProps> = ({
    items,
    multiple = false,
    expanded,
    defaultExpanded = [],
    onChange,
    className,
    style,
    ...rest
}) => {
    const generatedId = useId();
    const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState<string[]>(defaultExpanded);
    const isControlled = expanded !== undefined;
    const openIds = isControlled ? expanded : uncontrolledExpanded;

    const resolveId = (item: AccordionItemType, index: number) => item.id ?? `${generatedId}-${index}`;

    const setOpenIds = (next: string[]) => {
        if (!isControlled) {
            setUncontrolledExpanded(next);
        }
        onChange?.(next);
    };

    const focusTrigger = (index: number) => {
        const count = items.length;
        const nextIndex = ((index % count) + count) % count;
        triggerRefs.current[nextIndex]?.focus();
    };

    const onToggle = (itemId: string) => {
        const isOpen = openIds.includes(itemId);
        if (multiple) {
            setOpenIds(isOpen ? openIds.filter((id) => id !== itemId) : [...openIds, itemId]);
        } else {
            setOpenIds(isOpen ? [] : [itemId]);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                focusTrigger(index + 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                focusTrigger(index - 1);
                break;
            case "Home":
                e.preventDefault();
                focusTrigger(0);
                break;
            case "End":
                e.preventDefault();
                focusTrigger(items.length - 1);
                break;
            default:
                break;
        }
    };

    if (isEmpty(items)) {
        return <></>;
    }

    return (
        <div className={clsx("accordion", className)} style={style} {...rest}>
            {items.map((item, index) => {
                const itemId = resolveId(item, index);
                const headerId = `${itemId}-header`;
                const panelId = `${itemId}-panel`;
                const isOpen = openIds.includes(itemId);

                return (
                    <div className="accordion-item" data-expanded={isOpen} data-disabled={item.disabled} key={itemId}>
                        <header>
                            <button
                                type="button"
                                id={headerId}
                                ref={(el) => { triggerRefs.current[index] = el; }}
                                className="accordion-trigger"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                disabled={item.disabled}
                                onClick={() => onToggle(itemId)}
                                onKeyDown={(e) => onKeyDown(e, index)}
                            >
                                <>{item.header}</>
                                <FaAngleUp aria-hidden="true" />
                            </button>
                        </header>
                        <div id={panelId} className="accordion-content" aria-labelledby={headerId} hidden={!isOpen}>
                            {item.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
