"use client";

import React, { useEffect, useId } from "react";
import clsx from "clsx";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/utils/reorder";
import "./SortableList.scss";
import { SortableListItem, type DropEdge } from "./ListItem";
import { isItemData } from "./utilities";


export type SortableListItemState = {
    isDragging: boolean;
    dropEdge: DropEdge | null;
};

export type SortableListRenderArgs<T> = SortableListItemState & {
    /** Attach to the element that should act as the sole drag handle. If never called, the whole item is draggable. */
    dragHandleRef: (element: HTMLElement | null) => void;
    item: T;
    index: number;
};

export type SortableListProps<T> = {
    items: T[];
    /** Stable, unique identity for an item; used as the React key and drag/drop identity. */
    getKey: (item: T, index: number) => string;
    renderItem: (args: SortableListRenderArgs<T>) => React.ReactNode;
    onReorder: (items: T[]) => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Identity for this list among a group of cross-list-enabled SortableLists; auto-generated if omitted. */
    listId?: string;
    /** Called when an item is dropped in from a different SortableList; return `items` unchanged to reject it. */
    onReceive?: (item: T, atIndex: number) => void;
};


/**
 * A minimal, extensible sortable list built on <a href='https://www.npmjs.com/package/@atlaskit/pragmatic-drag-and-drop'>atlaskit/pragmatic-drag-and-drop</a><br /><br />
 * Handles drag/drop and reordering only — item markup and drag handle placement are entirely up to `renderItem`.
 */
export const SortableList = <T,>({ items, getKey, renderItem, onReorder, disabled, className, style, listId, onReceive }: SortableListProps<T>) => {
    const generatedListId = useId();
    const resolvedListId = listId ?? generatedListId;

    const reorderWithinList = (sourceKey: string, targetKey: string) => {
        // Resolve positions against the current `items` by key rather than trusting the
        // index captured when the drag started, which can go stale after an earlier reorder.
        const startIndex = items.findIndex((item, index) => getKey(item, index) === sourceKey);
        const finishIndex = items.findIndex((item, index) => getKey(item, index) === targetKey);
        if (startIndex === -1 || finishIndex === -1 || startIndex === finishIndex) { return; }

        onReorder(reorder({ list: items, startIndex, finishIndex }));
    };

    const removeSentItem = (sourceKey: string) => {
        // This item was dropped into a different list; remove it from here.
        const startIndex = items.findIndex((item, index) => getKey(item, index) === sourceKey);
        if (startIndex === -1) { return; }
        onReorder(items.filter((_, index) => index !== startIndex));
    };

    const receiveForeignItem = (item: T, targetKey: string) => {
        // An item from a different list was dropped into this one.
        const finishIndex = items.findIndex((existing, index) => getKey(existing, index) === targetKey);
        onReceive?.(item, finishIndex === -1 ? items.length : finishIndex);
    };

    useEffect(() => {
        if (disabled) { return undefined; }
        return monitorForElements({
            onDrop: ({ source, location }) => {
                const target = location.current.dropTargets[0];
                if (!target || !isItemData(source.data) || !isItemData(target.data)) { return; }
                const sourceListId = source.data.listId;
                const targetListId = target.data.listId;
                const sourceIsThisList = sourceListId === resolvedListId;
                const targetIsThisList = targetListId === resolvedListId;

                if (sourceIsThisList && targetIsThisList) {
                    reorderWithinList(source.data.key, target.data.key);
                } else if (sourceIsThisList) {
                    removeSentItem(source.data.key);
                } else if (targetIsThisList && onReceive) {
                    receiveForeignItem(source.data.item as T, target.data.key);
                }
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignoring for now
    }, [items, getKey, onReorder, disabled, resolvedListId, onReceive]);

    return (
        <ul className={clsx("sortable-list", className)} style={style}>
            {items.map((item, index) => (
                <SortableListItem key={getKey(item, index)} item={item} index={index} getKey={getKey} renderItem={renderItem} disabled={disabled} listId={resolvedListId} />
            ))}
        </ul>
    );
};
