import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: "Quarks/Typography",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ScaleAndSemantics: Story = {
    render: () => (
        <article style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <h1>Heading 1: Design systems need a clear voice</h1>
            <h2>Heading 2: Semantic structure improves readability</h2>
            <h3>Heading 3: Typography is a product feature</h3>
            <h4>Heading 4: Scale should be predictable</h4>
            <h5>Heading 5: Details still matter</h5>
            <h6>Heading 6: Supporting label hierarchy</h6>

            <p>
                This paragraph demonstrates body copy with <strong>strong emphasis</strong>,
                <em> italic emphasis</em>, <u>underlined text</u>, and <mark>highlighted text</mark>.
                It should remain easy to read at normal line length.
            </p>

            <p>
                You can also combine inline elements such as <code>inline code</code>,
                <kbd>kbd</kbd>, and <small>small helper text</small> in running content.
            </p>

            <blockquote>
                Good typography removes friction. Great typography guides attention.
            </blockquote>

            <hr />

            <h3>Lists</h3>
            <ul>
                <li>Unordered list item one</li>
                <li>Unordered list item two</li>
                <li>Unordered list item three</li>
            </ul>

            <ol>
                <li>Ordered list item one</li>
                <li>Ordered list item two</li>
                <li>Ordered list item three</li>
            </ol>

            <h3>Code Block HTML</h3>
            <code><pre>{`function greet(name: string) {
  return \`Hello, \${name}\`;
}`}</pre></code>
        </article>
    ),
};

export const LongFormArticle: Story = {
    render: () => (
        <article style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <header>
                <h2>Building A Cohesive Type System</h2>
                <p>
                    <small>Published July 2026</small>
                </p>
            </header>

            <p>
                A typography system should be opinionated enough to enforce consistency and
                flexible enough to support product-specific expression. Start by defining
                semantic intent first, then map intent to visual style.
            </p>

            <p>
                Avoid introducing one-off sizes for individual screens. Instead, establish a
                compact scale and reuse it across headings, body text, labels, and helper
                content. The visual rhythm should feel intentional rather than accidental.
            </p>

            <p>
                Finally, validate contrast and spacing in realistic content scenarios, not just
                isolated design mocks.
            </p>
        </article>
    ),
};
