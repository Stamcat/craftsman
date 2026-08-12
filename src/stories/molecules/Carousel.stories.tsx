import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../../components/Carousel/Carousel";
import stam from "../assets/stam2.jpg";
import kaluah from "../assets/kaluah.jpg";
import tito from "../assets/tito.jpg";
import "./Carousel.scss";
import { CarouselPageType } from "../../styles";

const SLIDES = [
    <figure><img src={stam} alt="Stam" loading="lazy" /><figcaption>Stam</figcaption></figure>,
    <figure><img src={kaluah} alt="Kaluah" loading="lazy" /><figcaption>Kaluah</figcaption></figure>,
    <figure><img src={tito} alt="Tito" loading="lazy" /><figcaption>Tito</figcaption></figure>,

];

const meta: Meta<typeof Carousel> = {
    title: "Molecules/Carousel",
    component: Carousel,
    tags: ["autodocs"],
    args: {
        buttons: true,
        pagination: "dots",
        className: "carouselWrapper",
        slides: SLIDES,
        loop: false,
        align: "center",
        direction: "ltr",
        dragFree: false,
        dragThreshold: 10,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        skipSnaps: false,
        startIndex: 0,
        duration: 25,
    },
    argTypes: {
        buttons: { control: "boolean" },
        pagination: {
            control: "select",
            options: CarouselPageType.options,
        },
        loop: { control: "boolean" },
        align: { control: "select", options: ["start", "center", "end"] },
        direction: { control: "radio", options: ["ltr", "rtl"] },
        dragFree: { control: "boolean" },
        dragThreshold: { control: "number" },
        slidesToScroll: { control: "number" },
        containScroll: { control: "select", options: ["trimSnaps", "keepSnaps"] },
        skipSnaps: { control: "boolean" },
        startIndex: { control: "number" },
        duration: { control: "number" },
        slides: { control: false },
        className: { control: false },
        style: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const FreeScroll: Story = {
    args: {
        dragFree: true,
        loop: true,
    },
};

