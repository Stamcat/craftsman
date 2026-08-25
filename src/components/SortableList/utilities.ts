export type ItemData = { key: string; index: number; listId: string; item: unknown };

export const isItemData = (data: Record<string | symbol, unknown>): data is ItemData =>
    typeof data.key === "string" && typeof data.index === "number" && typeof data.listId === "string";
