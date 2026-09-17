import DOMPurify, { type Config } from "dompurify";
import type { TextSize, TextTags, TextType } from "../../utilities/types";
import clsx from "clsx";
import "./Text.scss";

export type TextProps = React.HTMLAttributes<HTMLElement> & {
    /** Defines HTML tag that gets rendered */
	as?: TextTags;
    /** Rich text will always return a div */
	richText?: boolean;
    /** @deprecated Legacy support only. Recommend using semantic HTML5 - This will override base styling */
    type?: TextType;
    /** Recommend using semantic HTML5 - This will override base styling */
    size?: TextSize;
    /** @deprecated Legacy support only: simple text-align style (You don't need this) */
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
        if (typeof children !== "string") {
            return <div {...rest} className={classes}>{children}</div>;
        }
        const sanitizedContent = DOMPurify.sanitize(children, config);
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
