import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../../components/Carousel/Carousel";
import stam from "../assets/stam2.jpg";
import kaluah from "../assets/kaluah.jpg";
import tito from "../assets/tito.jpg";
import "./Carousel.scss";
import { CarouselPageType } from "../../styles";

const SLIDES = [
    <figure><img src={stam} alt="Stam" /><figcaption>Stam</figcaption></figure>,
    <figure><img src={kaluah} alt="Kaluah" /><figcaption>Kaluah</figcaption></figure>,
    <figure><img src={tito} alt="Tito" /><figcaption>Tito</figcaption></figure>,

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
        options: {
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
    },
    argTypes: {
        buttons: {
            control: "boolean"
        },
        pagination: {
            control: "select",
            options: CarouselPageType.options,
        },
        slides: { control: false },
        className: { control: false },
        style: { control: false },
        options: { control: "object" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FreeScroll: Story = {
    args: {
        buttons: true,
        options: { dragFree: true, loop: true },
    },
};

