import React from "react";
import styled, { css } from "styled-components";
import { color } from "../utilities/colors";
import { width } from "../utilities/layout";
import { Text } from "../components/Text";
import { RuleSet } from "styled-components/dist/types";
import { Button } from "./Button";
import { IconX } from "../icons/IconX";
import { IconCircleInfo } from "../icons/IconCircleInfo";
import { IconCircleCheck } from "../icons/IconCircleCheck";
import { IconCircleAlert } from "../icons/IconCircleAlert";
import { IconCircleHelp } from "../icons/IconCircleHelp";

export type NotificationType = "help" | "info" | "success" | "error";

interface NotificationProps {
    buttons?: React.ReactNode;
    onDismiss?: (id?: string) => void;
    visible?: boolean;
    type?: NotificationType;
    dismissable?: boolean;
    title?: string | React.ReactNode;
    message?: string | React.ReactNode;
    hideIcon?: boolean;
    styles?: RuleSet<object>;
    id?: string;
}

const typeStyles: Record<NotificationType, RuleSet<object>> = {
    info: css`
        border: 1px solid ${color("blue")};
        background-color: ${color("blueVeryLight")};
    `,
    success: css`
        border: 1px solid ${color("green")};
        background-color: ${color("greenMint")};
    `,
    error: css`
        border-color: ${color("red")};
        background-color: ${color("pink")};
    `,
    help: css``,
};

const NotificationWrapper = styled.div<{ $type: NotificationType; $styles: RuleSet<object> }>`
    padding: ${width("gutter")};
    border: 1px solid ${color("grey")};
    background-color: ${color("white")};
    border-radius: 4px;
    ${(props) => props.$type && typeStyles[props.$type]}
    ${(props) => props.$styles}
`;
const TextContainer = styled.div`
    flex-grow: 1;
    span {
        display: block;
    }
`;
const NotificationContents = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
`;
const statusColors: Record<NotificationType, string> = {
    info: color("blue"),
    success: color("garden"),
    error: color("red"),
    help: color("gray5"),
};

const getStatusIcon = (noticeType: NotificationType) => {
    const statusIcon: Record<NotificationType, JSX.Element> = {
        info: <IconCircleInfo fill={statusColors[noticeType]} />,
        success: <IconCircleCheck fill={statusColors[noticeType]} />,
        error: <IconCircleAlert fill={statusColors[noticeType]} />,
        help: <IconCircleHelp fill={statusColors[noticeType]} />,
    };
    return statusIcon[noticeType];
};
const buttonStyles: Record<NotificationType, RuleSet<object>> = {
    info: css`
        color: ${statusColors.info};
    `,
    success: css``,
    error: css`
        color: ${statusColors.error};
    `,
    help: css``,
};
const ButtonSet = styled.footer<{ $type: NotificationType }>`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
        padding: 0 ${width("gutter", 0.5)};
        &:last-child {
            padding-right: 0;
        }
    }
    span {
        font-size: 14px;
        ${(props) => props.$type && buttonStyles[props.$type]}
    }
`;
const IconContainer = styled.div`
    padding: 0 ${width("gutter")} 0 0;
`;
/* #__PURE__ */
export class Notification extends React.PureComponent<NotificationProps> {
    protected renderText = (content: string | React.ReactNode) => {
        if (typeof content === "string") {
            return <Text $type="span">{content}</Text>;
        } else {
            return content;
        }
    };
    protected onClickDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss(this.props.id);
        }
    };
    public render() {
        if (this.props.visible === false) {
            return <></>;
        }
        return (
            <NotificationWrapper $type={this.props.type || "info"} $styles={this.props.styles || css``}>
                <NotificationContents>
                    {this.props.hideIcon !== true && (
                        <IconContainer>{getStatusIcon(this.props.type || "info")}</IconContainer>
                    )}
                    <TextContainer>
                        {this.props.title && this.renderText(this.props.title)}
                        {this.props.message && this.renderText(this.props.message)}
                        {this.props.children}
                    </TextContainer>
                    {this.props.dismissable && (
                        <Button
                            onClick={this.onClickDismiss}
                            $type="text"
                            $styles={css`
                                padding: 0;
                            `}>
                            <IconX name="IconX" width={16} height={16} fill={statusColors[this.props.type || "info"]} />
                        </Button>
                    )}
                </NotificationContents>
                {this.props.buttons && <ButtonSet $type={this.props.type || "info"}>{this.props.buttons}</ButtonSet>}
            </NotificationWrapper>
        );
    }
}
