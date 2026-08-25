"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SortableListRenderArgs } from "./SortableList";
import clsx from "clsx";
import { isItemData, type ItemData } from "./utilities";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/utils/combine";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter";

export type DropEdge = "top" | "bottom";

export function SortableListItem<T>({
    item,
    index,
    getKey,
    renderItem,
    disabled,
    listId,
}: {
    item: T;
    index: number;
    getKey: (item: T, index: number) => string;
    renderItem: (args: SortableListRenderArgs<T>) => React.ReactNode;
    disabled?: boolean;
        listId: string;
}) {
    const [element, setElement] = useState<HTMLLIElement | null>(null);
    const [dragHandle, setDragHandle] = useState<HTMLElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dropEdge, setDropEdge] = useState<DropEdge | null>(null);
    const nodeRef = useRef<HTMLLIElement | null>(null);
    const previousRect = useRef<DOMRect | null>(null);
    const key = getKey(item, index);

    // FLIP: slide the item from its previous position into its new one instead of snapping.
    useLayoutEffect(() => {
        nodeRef.current = element;
        const node = nodeRef.current;
        if (!node) { return; }
        const previous = previousRect.current;
        const current = node.getBoundingClientRect();
        previousRect.current = current;

        const deltaY = previous ? previous.top - current.top : 0;
        if (!deltaY || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }

        node.style.transition = "none";
        node.style.transform = `translateY(${deltaY}px)`;
        requestAnimationFrame(() => {
            node.style.transition = "";
            node.style.transform = "";
        });
    }, [element, index]);

    useEffect(() => {
        if (!element || disabled) { return undefined; }
        const data: ItemData = { key, index, listId, item };

        return combine(
            draggable({
                element,
                dragHandle: dragHandle ?? undefined,
                getInitialData: () => data,
                onDragStart: () => setIsDragging(true),
                onDrop: () => setIsDragging(false),
            }),
            dropTargetForElements({
                element,
                getData: () => data,
                canDrop: ({ source }) => isItemData(source.data) && source.data.key !== key,
                onDrag: ({ location }) => {
                    const rect = element.getBoundingClientRect();
                    const isAfter = location.current.input.clientY > rect.top + rect.height / 2;
                    setDropEdge(isAfter ? "bottom" : "top");
                },
                onDragLeave: () => setDropEdge(null),
                onDrop: () => setDropEdge(null),
            }),
        );
    }, [element, dragHandle, key, index, disabled, listId, item]);

    return (
        <li key={key} ref={setElement} className={clsx("sortable-list-item", isDragging && "dragging", dropEdge && `drop-${dropEdge}`)}>
            {renderItem({ item, index, isDragging, dropEdge, dragHandleRef: setDragHandle })}
        </li>
    );
}

