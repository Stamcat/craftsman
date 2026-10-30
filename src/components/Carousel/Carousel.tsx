"use client";
import React, { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";

import { Button } from "../Button/Button";
import "./Carousel.scss";
import { FaAngleRight, FaAngleLeft, FaRegCircle, FaCircle } from "react-icons/fa6";
import clsx from "clsx";
import type { CarouselPageType } from "../../utilities/types";
import { Pagination } from "../Pagination/Pagination";

export type CarouselProps = Omit<EmblaOptionsType, "slides"> & {
    slides?: React.ReactNode[];
    className?: string;
    style?: React.CSSProperties;
    buttons?: boolean;
    pagination?: CarouselPageType;
};
/**
 * Carousel implements and extends <a href='https://www.embla-carousel.com/'>embla-carousel-react </a>
 * to include some built-in support to make your life easier without compromising Embla's lightweight hands-off approach.
 * Please don't use Embla's code examples directly. The code in their codepen is really bad.
 */
// Embla doesn't read the DOM's dir/direction itself, so read the document's ambient direction synchronously as a best-effort initial default.
const getAmbientDirection = (): "ltr" | "rtl" => {
    if (typeof document === "undefined") {
        return "ltr";
    }
    return getComputedStyle(document.documentElement).direction === "rtl" ? "rtl" : "ltr";
};

export const Carousel: React.FC<CarouselProps> = (props) => {
    const { slides = [], className, style, buttons = true, pagination = "dots", direction, ...restOpts } = props;
    // Hooks
    const containerRef = useRef<HTMLDivElement>(null);
    const [detectedDirection, setDetectedDirection] = useState<"ltr" | "rtl">(getAmbientDirection);
    const opts = { ...restOpts, direction: direction ?? detectedDirection };
    const [emblaRef, emblaApi] = useEmblaCarousel(opts);

    const scrollEvent = useCallback(
        (onChange: () => void) => {
            if (!emblaApi) {
                return () => { };
            }
            emblaApi.on("select", onChange).on("reInit", onChange);
            return () => {
                emblaApi.off("select", onChange);
                emblaApi.off("reInit", onChange);
            };
        },
        [emblaApi],
    );
    // Correct against the container's own ancestor (may differ from the document root); Embla's hook reinitializes itself when its options change, so this only needs to update state.
    useLayoutEffect(() => {
        if (direction || !containerRef.current) {
            return;
        }
        const measuredDirection = getComputedStyle(containerRef.current).direction === "rtl" ? "rtl" : "ltr";
        setDetectedDirection((prev) => (prev === measuredDirection ? prev : measuredDirection));
    }, [direction]);
    // State
    const canPrev = useSyncExternalStore(
        scrollEvent,
        () => !!emblaApi?.canScrollPrev(),
        () => false,
    );
    const canNext = useSyncExternalStore(
        scrollEvent,
        () => !!emblaApi?.canScrollNext(),
        () => false,
    );
    const currentIndex = useSyncExternalStore(
        scrollEvent,
        () => emblaApi?.selectedScrollSnap() ?? 0,
        () => 0,
    );
    // Actions
    const onPressPrev = () => emblaApi?.scrollPrev();
    const onPressNext = () => emblaApi?.scrollNext();
    const onPressIdx = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(e.currentTarget.value, 10) || 0;
        emblaApi?.scrollTo(index);
    };
    return (
        <div className={clsx("carousel", className)} style={style} ref={containerRef}>
            <div className="carousel__viewport" ref={emblaRef}>
                <div className="carousel__container">
                    {slides.map((slide, index) => (
                        <div className="carousel__slide" key={`slide-${index}`}>
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel__controls">
                {buttons && (
                    <div className="carousel__buttons">
                        <Button variant="text" onClick={onPressPrev} disabled={!canPrev} name="prev" aria-label="Previous slide">
                            <FaAngleLeft size={24} aria-hidden="true" className="carousel__chevron" />
                        </Button>
                        <Button variant="text" onClick={onPressNext} disabled={!canNext} name="next" aria-label="Next slide">
                            <FaAngleRight size={24} aria-hidden="true" className="carousel__chevron" />
                        </Button>
                    </div>
                )}
                {pagination === "dots" && (
                    <div className="carousel__dots">
                        {slides.map((_, idx) => {
                            return (
                                <Button
                                    variant="text"
                                    value={idx}
                                    onClick={onPressIdx}
                                    key={`dot-${idx}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    aria-current={currentIndex === idx ? "true" : undefined}
                                >
                                    {currentIndex === idx ? <FaCircle size={16} aria-hidden="true" /> : <FaRegCircle size={16} aria-hidden="true" />}
                                </Button>
                            );
                        })}
                    </div>
                )}
                {pagination === "numbers" && (
                    <Pagination total={slides.length} current={currentIndex} onChange={onPressIdx} />
                )}
            </div>
        </div>
    );
};
