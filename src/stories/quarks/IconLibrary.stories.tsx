import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { color } from "../../utilities/colors";
import { gutter } from "../../utilities/layout";
import { NotificationPanel } from "../../components/NotificationPanel";
import { Notification } from "../../components/Notification";
import * as Icons from "../helpers/icons";

const icons: string[] = [
    "IconAccount",
    "IconArrowDown",
    "IconArrowLeft",
    "IconArrowRight",
    "IconArrowUp",
    "IconBagAdd",
    "IconBag",
    "IconBookmark",
    "IconChat",
    "IconCheck",
    "IconChevronDown",
    "IconChevronLeft",
    "IconChevronRight",
    "IconChevronUp",
    "IconCircleAlert",
    "IconCircleArrowDown",
    "IconCircleArrowRight",
    "IconCircleArrowUp",
    "IconCircleCheck",
    "IconCircleChevronDown",
    "IconCircleChevronLeft",
    "IconCircleChevronRight",
    "IconCircleChevronUp",
    "IconCircleFilters",
    "IconCircleGluten",
    "IconCircleHeart",
    "IconCircleHelp",
    "IconCircleInfo",
    "IconCircleLeft",
    "IconCircleMinus",
    "IconCirclePause",
    "IconCirclePlay",
    "IconCirclePlus",
    "IconCircleQuote",
    "IconCircleShare",
    "IconCircleSlash",
    "IconCircleThumbsUp",
    "IconCircleUser",
    "IconCircleVegan",
    "IconCircleX",
    "IconClosedCaption",
    "IconCoaching",
    "IconCommunity",
    "IconCopy",
    "IconDetails",
    "IconDisabled",
    "IconDot",
    "IconEyeSlash",
    "IconEye",
    "IconFilter",
    "IconFullscreen",
    "IconGlobe",
    "IconHeart",
    "IconKnowledge",
    "IconLink",
    "IconLocation",
    "IconMail",
    "IconMenu",
    "IconMinus",
    "IconMore",
    "IconMotivation",
    "IconOrders",
    "IconPassword",
    "IconPayment",
    "IconPhone",
    "IconPictureInPicture",
    "IconPlus",
    "IconPrint",
    "IconReorder",
    "IconResults",
    "IconSearchAlt",
    "IconSearch",
    "IconShare",
    "IconSocialFacebook",
    "IconSocialInstagram",
    "IconSocialLinkedin",
    "IconSocialPinterest",
    "IconSocialTelegram",
    "IconSocialTwitter",
    "IconSocialWhatsapp",
    "IconSparkles",
    "IconStar",
    "IconStatusCancel",
    "IconStatusDelivered",
    "IconStatusRefund",
    "IconStatusShipped",
    "IconSwap",
    "IconThumbsUp",
    "IconTrash",
    "IconVerified",
    "IconVolumeDown",
    "IconVolumeOff",
    "IconVolumeUp",
    "IconX",
];

// TODO: Move this to components because it will be cool.
const Gallery = styled.section`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;
const GalleryFigure = styled.figure`
    padding: ${gutter()};
    margin: 0;
    width: 80px;
    background: ${color("white")};
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
`;
const IconContainer = styled.div`
    margin-bottom: ${gutter(0.5)};
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
`;
const GalleryCaption = styled.figcaption`
    text-align: center;
    width: 100%;
`;

class IconLibrary extends React.PureComponent {
    readonly state = { copied: "", showNotice: false };
    protected copyToClipboard = (e: React.MouseEvent<HTMLElement>) => {
        navigator.clipboard.writeText(e.currentTarget.id);
        this.setState({ copied: e.currentTarget.id, showNotice: true });
    };
    protected dismissNotice = () => {
        this.setState({ showNotice: false });
    };
    public render() {
        return (
            <Gallery>
                {icons.map((name) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- it can be any for now.
                    const Icon = (Icons as any)[name];
                    return (
                        <GalleryFigure key={name} id={name} onClick={this.copyToClipboard}>
                            <IconContainer>
                                <Icon width={30} height={30} />
                            </IconContainer>
                            <GalleryCaption>
                                <small>{name}</small>
                            </GalleryCaption>
                        </GalleryFigure>
                    );
                })}

                <NotificationPanel position="topRight">
                    <Notification
                        dismissable={true}
                        onDismiss={this.dismissNotice}
                        message={<strong>{this.state.copied}</strong>}
                        title={"Copied to Clipboard!"}
                        visible={this.state.showNotice}
                        type="success"
                    />
                </NotificationPanel>
            </Gallery>
        );
    }
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconLibrary> = {
    title: "Quarks/Icons",
    component: IconLibrary,
    tags: ["autodocs"],

    args: {},
    parameters: {
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
                    "This is our complete icons library. They are normalized based on the output of the Dentsu style guide. Click on an icon to copy its name to clipboard, then you can use the SVGIcon tool to render it with custom colors!",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof IconLibrary>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const IconGallery: Story = {
    args: {},
};
