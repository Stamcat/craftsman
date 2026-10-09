import type { EmblaCarouselType } from "embla-carousel";
import { CIRCLE_DEGREES, IN_VIEW_DEGREES, WHEEL_ITEM_RADIUS, WHEEL_ITEM_SIZE, WHEEL_RADIUS } from "./constants";

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
