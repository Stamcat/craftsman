import DOMPurify, { type Config } from "dompurify";
import type { TextSize } from "storybook/theming";
import type { TextTags, TextType } from "../../utilities/types";
import clsx from "clsx";
import "./Text.scss";

export type TextProps = React.HTMLAttributes<HTMLElement> & {
    /** Defines HTML tag that gets rendered */
	as?: TextTags;
    /** Rich text will always return a div */
	richText?: boolean;
    /** Recommend using semantic HTML5 - This will override base styling */
    type?: TextType;
    /** Recommend using semantic HTML5 - This will override base styling */
    size?: TextSize;
    /** Legacy support: simple text-align style (You don't need this) */
	alignment?: "center" | "left" | "right";
};
/**
 * Uses global HTML5 tag declarations by default. 
 * Provides sanitization for rich text elements
 * Provides override handling for text type, size, alignment.
 */
export const Text: React.FC<TextProps> = ({
	as = "div",
	children,
	type,
	size,
	className,
	alignment,
	richText,
	...rest
}) => {

	const classes = clsx(
        type && type,
        size && size,
        alignment && alignment,
        "text",
		className,
	);

    if (richText) {
        const config: Config = {
            ADD_ATTR: ["target"]
        }
        const sanitizedContent = typeof children === "string" ? DOMPurify.sanitize(children, config) : children;
        return (
			<div
				{...rest}
				className={classes}
				dangerouslySetInnerHTML={{ __html: sanitizedContent || "" }}
			/>
		);
	}
    const Tag = as;
	return <Tag {...rest} className={classes}>{children}</Tag>;
}
