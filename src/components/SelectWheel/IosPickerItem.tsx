"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { WHEEL_ITEM_RADIUS, WHEEL_ITEM_SIZE, WHEEL_RADIUS } from "./constants";
import { inactivateEmblaTransform, setContainerStyles, setSlideStyles, snapOnPointerUp } from "./utilities";

const PERSPECTIVE = 1000;
const WHEEL_SCALE = PERSPECTIVE / (PERSPECTIVE - WHEEL_RADIUS * 2);
const SCENE_PADDING = 6;

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

    useEffect(() => {
        if (!emblaApi || disabled) { return () => { }; }
        const node = emblaApi.rootNode();
        let accumulated = 0;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            accumulated += event.deltaY;
            while (Math.abs(accumulated) >= WHEEL_ITEM_SIZE) {
                if (accumulated > 0) {
                    emblaApi.scrollNext();
                    accumulated -= WHEEL_ITEM_SIZE;
                } else {
                    emblaApi.scrollPrev();
                    accumulated += WHEEL_ITEM_SIZE;
                }
            }
        };

        node.addEventListener("wheel", handleWheel, { passive: false });
        return () => node.removeEventListener("wheel", handleWheel);
    }, [emblaApi, disabled]);

    useLayoutEffect(() => {
        const scene = rootNodeRef.current;
        const viewport = scene?.querySelector<HTMLDivElement>(".ios-picker__viewport");
        const sampleSlide = scene?.querySelector<HTMLDivElement>(".ios-picker__slide");
        if (!scene || !viewport || !sampleSlide) { return; }

        const measurer = document.createElement("span");
        measurer.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;";
        measurer.style.font = window.getComputedStyle(sampleSlide).font;
        document.body.appendChild(measurer);

        let maxWidth = 0;
        for (let index = 0; index < slideCount; index += 1) {
            measurer.textContent = String(slides ? slides[index] : index + offset);
            maxWidth = Math.max(maxWidth, measurer.offsetWidth);
        }
        document.body.removeChild(measurer);

        viewport.style.width = `${Math.ceil(maxWidth)}px`;
        scene.style.width = `${Math.ceil(maxWidth * WHEEL_SCALE) + SCENE_PADDING * 2}px`;
    }, [slideCount, slides, offset]);

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
