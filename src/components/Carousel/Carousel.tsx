"use client";
import React, { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";

import { Button } from "../Button/Button";
import "./Carousel.scss";
import { FaAngleRight, FaAngleLeft, FaRegCircle, FaCircle } from "react-icons/fa6";
import clsx from "clsx";
import type { CarouselPageType } from "../../utilities/types";

export type CarouselProps = {
    slides?: React.ReactNode[];
    options?: EmblaOptionsType;
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
export const Carousel: React.FC<CarouselProps> = (props) => {
    const { slides = [], options, className, style, buttons = true, pagination = "dots" } = props;
    // Hooks
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

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
        <div className={clsx("carousel", className)} style={style}>
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
                        <Button variant="text" onClick={onPressPrev} disabled={!canPrev} name="prev">
                            <FaAngleLeft size={24} aria-label="prev" />
                        </Button>
                        <Button variant="text" onClick={onPressNext} disabled={!canNext} name="next">
                            <FaAngleRight size={24} aria-label="next" />
                        </Button>
                    </div>
                )}
                {pagination === "dots" && (
                    <div className="carousel__dots">
                        {slides.map((_, idx) => {
                            return (
                                <Button variant="text" value={idx} onClick={onPressIdx} key={`dot-${idx}`}>
                                    {currentIndex === idx ? <FaCircle size={14} /> : <FaRegCircle size={14} />}
                                </Button>
                            );
                        })}
                    </div>
                )}
                {pagination === "numbers" && (
                    <>pagination coming soon</>
                )}
            </div>
        </div>
    );
};
