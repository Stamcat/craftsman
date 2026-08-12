import type { EmblaCarouselType } from "embla-carousel";
import { CIRCLE_DEGREES, IN_VIEW_DEGREES, WHEEL_ITEM_RADIUS, WHEEL_ITEM_SIZE, WHEEL_RADIUS } from "./constants";
import { isEmpty } from "../../utilities";

export const parseTimeString = (val: unknown): [number, number] => {
    if (typeof val !== "string" || !val.includes(":")) {
        return [0, 0];
    }
    const [h, m] = val.split(":").map(Number);
    return [isNaN(h) ? 0 : h, isNaN(m) ? 0 : m];
};

export const padTime = (n: number) => String(n).padStart(2, "0");

export const toDisplayHour = (hours: number, is12h: boolean): number =>
    is12h ? (hours % 12 === 0 ? 12 : hours % 12) : hours;

export const to24Hour = (display: number, isPM: boolean, is12h: boolean): number => {
    if (!is12h) {
        return display;
    }
    return display === 12 ? (isPM ? 12 : 0) : isPM ? display + 12 : display;
};

export const resolveLocale = (locale?: Intl.LocalesArgument): string => {
    if (!locale) {
        return typeof navigator !== "undefined" ? navigator.language : "en-US";
    }
    return Array.isArray(locale) ? String(locale[0]) : String(locale);
};

export const isInView = (wheelLocation: number, slidePosition: number): boolean =>
    Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES;

export const setSlideStyles = (
    emblaApi: EmblaCarouselType,
    index: number,
    loop: boolean,
    slideCount: number,
    totalRadius: number,
): void => {
    const slideNode = emblaApi.slideNodes()[index];
    const wheelLocation = emblaApi.scrollProgress() * totalRadius;
    const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius;
    const positionLoopStart = positionDefault + totalRadius;
    const positionLoopEnd = positionDefault - totalRadius;

    let inView = false;
    let angle = index * -WHEEL_ITEM_RADIUS;

    if (isInView(wheelLocation, positionDefault)) {
        inView = true;
    }
    if (loop && isInView(wheelLocation, positionLoopEnd)) {
        inView = true;
        angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS;
    }
    if (loop && isInView(wheelLocation, positionLoopStart)) {
        inView = true;
        angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS;
    }

    if (inView) {
        slideNode.style.opacity = "1";
        slideNode.style.transform = `translateY(-${index * 100}%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`;
    } else {
        slideNode.style.opacity = "0";
        slideNode.style.transform = "none";
    }
};

export const setContainerStyles = (emblaApi: EmblaCarouselType, wheelRotation: number): void => {
    emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`;
};

// No closure deps — safe to define at module level
export const inactivateEmblaTransform = (emblaApi: EmblaCarouselType): void => {
    const { translate } = emblaApi.internalEngine();
    translate.clear();
    translate.toggleActive(false);
};

export const snapOnPointerUp = (emblaApi: EmblaCarouselType): void => {
    const { scrollTo, target, location } = emblaApi.internalEngine();
    const displacement = target.get() - location.get();
    const factor = Math.abs(displacement) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1;
    scrollTo.distance(displacement * factor, true);
};

export const resolveHasValue = (value: React.ComponentProps<"input">["value"], internalHours: number | null) =>
    value !== undefined ? !isEmpty(value) : internalHours !== null;

export const resolveTime = (value: unknown, h: number | null, m: number | null): [number, number] =>
    !isEmpty(value) ? parseTimeString(value) : [h ?? 0, m ?? 0];

export const toDisplayInputValue = (hasVal: boolean, val: string | number) => (hasVal ? String(val) : "");
