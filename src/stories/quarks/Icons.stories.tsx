import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { width } from "../../styles/utilities/layout";
import { Button, Modal } from "../../components";
import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { globalStyles } from "../../styles/global/globalStyles";
/**
 * This is mostly vibe coded trash. don't look at this file as an example of how to do anything. 
 * Only look at the storybook directly
 * 
 */
const IMPLEMENTATION_EXAMPLE = `import { FaAccessibleIcon } from "react-icons/fa";

export function YourComponent() {
    return (
        <FaAccessibleIcon size={30} />
    );
}`;

const MAX_ICONS_PER_STORY = 200;

const getUsageSnippet = (name: string, iconPath: string) => {
    if (!name || !iconPath) {
        return "Select an icon to see its import.";
    }

    return `import { ${name} } from "${iconPath}";\n\nconst Example = () => React.createElement(${name}, { size: 24 });`;
};

type IconRenderBoundaryProps = {
    children: React.ReactNode;
};

type IconRenderBoundaryState = {
    hasError: boolean;
};

class IconRenderBoundary extends React.PureComponent<IconRenderBoundaryProps, IconRenderBoundaryState> {
    readonly state: IconRenderBoundaryState = { hasError: false };

    static getDerivedStateFromError(): IconRenderBoundaryState {
        return { hasError: true };
    }

    public render() {
        if (this.state.hasError) {
            return <span aria-hidden="true">-</span>;
        }

        return this.props.children;
    }
}

const meta: Meta = {
    title: "Quarks/Icons",
    tags: ["autodocs"],

    parameters: {
        layout: "padded",
        docs: {
            page: () => (
                <section>
                    <Global styles={globalStyles} />
                    <h1>Icons</h1>
                    <p>
                        Craftsman implements <a href="https://react-icons.github.io/" target="_blank">react-icons</a> directly and without alteration. Each icon-set story uses namespace imports and dynamic export discovery, so no per-icon imports are required.<br />
                    </p>
                    <blockquote>
                        <strong>Warning:</strong> These libraries may be slow to load on your local machine.
                    </blockquote>
                    <header>
                        <h4>Icon usage</h4>
                    </header>

                    <code>
                        <pre>
                            {IMPLEMENTATION_EXAMPLE}
                        </pre>
                    </code>

                </section>
            ),
            description: {
                component: "Craftsman implements react-icons directly and without alteration."
            }
        }
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Page = styled.div`
    display: flex;
    flex-flow: column;
    gap: ${width("gutter")};
`;

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: ${width("gutter", 0.5)};
    flex-wrap: wrap;
`;

const Grid = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    gap: ${width("gutter")};
`;

const Card = styled.div`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    width: 96px;
    display: flex;
    flex-direction: column;

    footer {
        width: 100%;
        display: inline-flex;
        justify-content: center;
    }
`;

const SwatchPreview = styled.div`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f3f4f6;
`;

const IconName = styled.small`
    font-size: 10px;
    word-break: break-word;
`;
type IconCardProps = {
    name: string;
    Icon: IconType;
    importPath: string;
    onSelect: (name: string, iconPath: string) => void;
};

/** Renders nothing until the card enters the viewport, then mounts the icon. */
const IconCard = ({ name, Icon, importPath, onSelect }: IconCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

    const onPressSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedName = e.currentTarget.value;
        const selectedPath = e.currentTarget.dataset.iconPath;
        if (!selectedPath) {
            return;
        }
        onSelect(selectedName, selectedPath);
    };

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            return undefined;
        }

        const el = ref.current;
        if (!el) {
            return undefined;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Card>
            <SwatchPreview ref={ref}>
                {inView && <Button
                    variant="text"
                    onClick={onPressSelect}
                    value={name}
                    data-icon-path={importPath}
                    aria-label={`Show import and usage for ${name}`}
                >
                    <IconRenderBoundary>
                        <Icon size={28} aria-label={name} />
                    </IconRenderBoundary>
                </Button>}
            </SwatchPreview>
            <footer>
                <Button
                    variant="text"
                    onClick={onPressSelect}
                    value={name}
                    data-icon-path={importPath}
                    aria-label={`Show import and usage for ${name}`}
                >
                    <IconName>{name}</IconName>
                </Button>
            </footer>
        </Card>
    );
};

type IconEntry = {
    name: string;
    Icon: IconType;
    importPath: string;
};

type IconLoadResult = {
    icons: IconEntry[];
    total: number;
};

type IconUsageState = {
    name: string;
    iconPath: string;
    visible: boolean;
};

type IconModuleLoader = () => Promise<Record<string, unknown>>;

const getIcons = (icons: Record<string, unknown>, prefix: string, importPath: string): IconLoadResult => {
    const entries = Object.entries(icons)
        .filter(([name, value]) => name.startsWith(prefix) && /^[A-Za-z][A-Za-z0-9]+$/.test(name) && typeof value === "function")
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, Icon]) => ({
            name,
            Icon: Icon as IconType,
            importPath,
        }));

    return {
        total: entries.length,
        icons: entries.slice(0, MAX_ICONS_PER_STORY),
    };
};

type GalleryProps = {
    icons: IconEntry[] | null;
    total: number;
    error: string | null;
};

const IconGallery = ({ icons, total, error }: GalleryProps) => {
    const [iconUsage, setIconUsage] = useState<IconUsageState>({
        name: "",
        iconPath: "",
        visible: false,
    });

    if (error) {
        return <p>{error}</p>;
    }

    if (icons === null) {
        return <p>Loading icons…</p>;
    }

    return (
        <Page>
            <Toolbar>
                <span>Showing {icons.length} of {total} icons</span>
            </Toolbar>
            <Grid>
                {icons.map(({ name, Icon, importPath }) => (
                    <IconCard
                        key={name}
                        name={name}
                        Icon={Icon}
                        importPath={importPath}
                        onSelect={(selectedName, selectedPath) => {
                            setIconUsage({
                                name: selectedName,
                                iconPath: selectedPath,
                                visible: true,
                            });
                        }}
                    />
                ))}
            </Grid>
            <Modal
                header={iconUsage.name || "Icon Usage"}
                visible={iconUsage.visible}
                onDismiss={() => setIconUsage((prev) => ({ ...prev, visible: false }))}
            >
                <code>
                    <pre>{getUsageSnippet(iconUsage.name, iconUsage.iconPath)}</pre>
                </code>
            </Modal>
        </Page>
    );
};

const LazyIconGallery = ({ loader, prefix, importPath }: { loader: IconModuleLoader; prefix: string; importPath: string }) => {
    const [icons, setIcons] = useState<IconEntry[] | null>(null);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loader()
            .then((mod) => {
                const result = getIcons(mod, prefix, importPath);
                setIcons(result.icons);
                setTotal(result.total);
                setError(null);
            })
            .catch(() => {
                setIcons([]);
                setTotal(0);
                setError(`Unable to load icons from ${importPath}.`);
            });
    }, [loader, prefix, importPath]);

    return <IconGallery icons={icons} total={total} error={error} />;
};

const createIconSetStory = (loader: IconModuleLoader, prefix: string, importPath: string): Story => ({
    render: () => <LazyIconGallery loader={loader} prefix={prefix} importPath={importPath} />,
});

export const AntDesign: Story = createIconSetStory(() => import("react-icons/ai"), "Ai", "react-icons/ai");
export const BoxIcons: Story = createIconSetStory(() => import("react-icons/bi"), "Bi", "react-icons/bi");
export const BootstrapIcons: Story = createIconSetStory(() => import("react-icons/bs"), "Bs", "react-icons/bs");
export const CssGgIcons: Story = createIconSetStory(() => import("react-icons/cg"), "Cg", "react-icons/cg");
export const CircumIcons: Story = createIconSetStory(() => import("react-icons/ci"), "Ci", "react-icons/ci");
export const Devicons: Story = createIconSetStory(() => import("react-icons/di"), "Di", "react-icons/di");
export const FontAwesome: Story = createIconSetStory(() => import("react-icons/fa"), "Fa", "react-icons/fa");
export const FontAwesome6: Story = createIconSetStory(() => import("react-icons/fa6"), "Fa", "react-icons/fa6");
export const FlatColorIcons: Story = createIconSetStory(() => import("react-icons/fc"), "Fc", "react-icons/fc");
export const Feather: Story = createIconSetStory(() => import("react-icons/fi"), "Fi", "react-icons/fi");
export const GameIcons: Story = createIconSetStory(() => import("react-icons/gi"), "Gi", "react-icons/gi");
export const GithubOcticons: Story = createIconSetStory(() => import("react-icons/go"), "Go", "react-icons/go");
export const GrommetIcons: Story = createIconSetStory(() => import("react-icons/gr"), "Gr", "react-icons/gr");
export const HeroIcons: Story = createIconSetStory(() => import("react-icons/hi"), "Hi", "react-icons/hi");
export const HeroIcons2: Story = createIconSetStory(() => import("react-icons/hi2"), "Hi", "react-icons/hi2");
export const IcoMoonFree: Story = createIconSetStory(() => import("react-icons/im"), "Im", "react-icons/im");
export const Ionicons4: Story = createIconSetStory(() => import("react-icons/io"), "Io", "react-icons/io");
export const Ionicons5: Story = createIconSetStory(() => import("react-icons/io5"), "Io", "react-icons/io5");
export const LineAwesome: Story = createIconSetStory(() => import("react-icons/lia"), "Lia", "react-icons/lia");
export const Lucide: Story = createIconSetStory(() => import("react-icons/lu"), "Lu", "react-icons/lu");
export const MaterialDesignIcons: Story = createIconSetStory(() => import("react-icons/md"), "Md", "react-icons/md");
export const PhosphorIcons: Story = createIconSetStory(() => import("react-icons/pi"), "Pi", "react-icons/pi");
export const RemixIcons: Story = createIconSetStory(() => import("react-icons/ri"), "Ri", "react-icons/ri");
export const RadixIcons: Story = createIconSetStory(() => import("react-icons/rx"), "Rx", "react-icons/rx");
export const SimpleIcons: Story = createIconSetStory(() => import("react-icons/si"), "Si", "react-icons/si");
export const SimpleLineIcons: Story = createIconSetStory(() => import("react-icons/sl"), "Sl", "react-icons/sl");
export const TablerIcons: Story = createIconSetStory(() => import("react-icons/tb"), "Tb", "react-icons/tb");
export const ThemifyIcons: Story = createIconSetStory(() => import("react-icons/tfi"), "Tfi", "react-icons/tfi");
export const Typicons: Story = createIconSetStory(() => import("react-icons/ti"), "Ti", "react-icons/ti");
export const VSCodeIcons: Story = createIconSetStory(() => import("react-icons/vsc"), "Vsc", "react-icons/vsc");
export const WeatherIcons: Story = createIconSetStory(() => import("react-icons/wi"), "Wi", "react-icons/wi");

export const Palette: Story = {
    render: () => <LazyIconGallery loader={() => import("react-icons/ai")} prefix="Ai" importPath="react-icons/ai" />,
};
