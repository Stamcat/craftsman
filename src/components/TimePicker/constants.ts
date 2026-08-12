export const CIRCLE_DEGREES = 360;
export const WHEEL_ITEM_SIZE = 32;
export const WHEEL_ITEM_COUNT = 18;
export const WHEEL_ITEMS_IN_VIEW = 4;

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT;
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW;
export const WHEEL_RADIUS = Math.round(
    WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)
);
