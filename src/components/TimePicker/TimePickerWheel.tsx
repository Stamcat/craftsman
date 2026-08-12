"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WHEEL_ITEM_RADIUS } from "./constants";
import { inactivateEmblaTransform, setContainerStyles, setSlideStyles, snapOnPointerUp } from "./utilities";

export type IosPickerItemProps = {
    loop?: boolean;
    label: string;
    slideCount: number;
    perspective: "left" | "right" | "center";
    /** Added to each slide's index when displaying (e.g. 1 for 12h hours: renders 1–12 instead of 0–11) */
    offset?: number;
    /** Override slide content; if provided, slideCount should equal slides.length */
    slides?: React.ReactNode[];
    selectedIndex?: number;
    onSelect?: (index: number) => void;
    disabled?: boolean;
};

export const IosPickerItem = (props: IosPickerItemProps) => {
    const { slideCount, perspective, label, loop = false, offset = 0, slides, selectedIndex, onSelect, disabled } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop,
        axis: "y",
        dragFree: true,
        containScroll: false,
    });
    const rootNodeRef = useRef<HTMLDivElement>(null);
    // stable ref so onSelect changes don't re-run the event effect
    const onSelectRef = useRef(onSelect);
    useLayoutEffect(() => { onSelectRef.current = onSelect; });
    const totalRadius = slideCount * WHEEL_ITEM_RADIUS;
    const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;

    const rotateWheel = useCallback(
        (emblaApi: EmblaCarouselType) => {
            const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset;
            const wheelRotation = rotation * emblaApi.scrollProgress();
            setContainerStyles(emblaApi, wheelRotation);
            emblaApi.slideNodes().forEach((_, index) => {
                setSlideStyles(emblaApi, index, loop, slideCount, totalRadius);
            });
        },
        [loop, slideCount, rotationOffset, totalRadius]
    );

    useEffect(() => {
        if (!emblaApi) {
            return () => {};
        }
        const handleSelect = (api: EmblaCarouselType) => onSelectRef.current?.(api.selectedScrollSnap());
        emblaApi.on("pointerUp", snapOnPointerUp);
        emblaApi.on("scroll", rotateWheel);
        emblaApi.on("reInit", inactivateEmblaTransform);
        emblaApi.on("reInit", rotateWheel);
        emblaApi.on("select", handleSelect);
        inactivateEmblaTransform(emblaApi);
        rotateWheel(emblaApi);
        return () => {
            emblaApi.off("pointerUp", snapOnPointerUp);
            emblaApi.off("scroll", rotateWheel);
            emblaApi.off("reInit", inactivateEmblaTransform);
            emblaApi.off("reInit", rotateWheel);
            emblaApi.off("select", handleSelect);
        };
    }, [emblaApi, rotateWheel]);

    useEffect(() => {
        if (!emblaApi || selectedIndex === undefined) { return; }
        if (emblaApi.selectedScrollSnap() === selectedIndex) { return; }
        emblaApi.scrollTo(selectedIndex);
    }, [emblaApi, selectedIndex]);

    return (
        <div className={clsx("ios-picker", { "ios-picker--disabled": disabled })} aria-disabled={disabled}>
            <div className="ios-picker__scene" ref={rootNodeRef}>
                <div
                    className={`ios-picker__viewport ios-picker__viewport--perspective-${perspective}`}
                    ref={emblaRef}
                >
                    <div className="ios-picker__container">
                        {Array.from({ length: slideCount }, (_, index) => (
                            <div className="ios-picker__slide" key={index}>
                                {slides ? slides[index] : index + offset}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ios-picker__label">{label}</div>
        </div>
    );
};
