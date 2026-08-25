"use client";

import clsx from "clsx";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCloseOutline,
    IoHelpCircleOutline,
    IoInformationCircleOutline,
} from "react-icons/io5";
import type { NoticeType, TextTags } from "../../utilities/types";
import "./Notice.scss";

export type NoticeProps = React.ComponentPropsWithoutRef<"div"> & {
    /** Visual/semantic variant. default = "info" */
    type?: NoticeType;
    icon?: React.ReactNode;
    title?: string | React.ReactNode;
    message?: string | React.ReactNode;
    /** Footer content, typically action buttons */
    buttons?: React.ReactNode;
    /** Controls visibility; renders nothing when false */
    visible?: boolean;
    dismissible?: boolean;
    onDismiss?: (id?: string) => void;
    id?: string;
};

const statusIcons: Record<NoticeType, React.ReactNode> = {
    info: <IoInformationCircleOutline />,
    success: <IoCheckmarkCircleOutline />,
    error: <IoAlertCircleOutline />,
    help: <IoHelpCircleOutline />,
    none: <></>
};

const renderText = (content: string | React.ReactNode, tag: TextTags) =>
    typeof content === "string" ? <Text as={tag}>{content}</Text> : content;

/**
 * Use this for informational content. We also provide an optional dismiss button, you pass in the event that controls what it does
 */
export const Notice: React.FC<NoticeProps> = ({
    type = "info",
    title,
    message,
    buttons,
    id,
    className,
    style,
    icon,
    children,
    dismissible,
    onDismiss,
    ...rest
}) => {
    const onPressDismiss = () => {
        onDismiss?.(id);
    }
    return (
        <div
            id={id}
            className={clsx("notice", type, className)}
            style={style}
            {...rest}
        >
            <div className="notice-contents">
                {type !== "none" && <div className="notice-icon">{icon || statusIcons[type]}</div>}
                <div className="notice-text">
                    {title && renderText(title, "h5")}
                    {message && renderText(message, "span")}
                    {children}
                </div>
                {dismissible && (
                    <Button variant="text" className="notice-dismiss" onClick={onPressDismiss}>
                        <IoCloseOutline size={16} />
                    </Button>
                )}
            </div>
            {buttons && <footer className="notice-buttons">{buttons}</footer>}
        </div>
    );
};

