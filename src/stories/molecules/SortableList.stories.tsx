import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SortableList, type SortableListProps } from "../../components/SortableList/SortableList";

const meta: Meta<typeof SortableList> = {
    title: "Molecules/SortableList",
    component: SortableList,
    tags: ["autodocs"],
    argTypes: {
        items: { control: false },
        getKey: { control: false },
        renderItem: { control: false },
        onReorder: { control: false },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof SortableList>;

const fruits = ["Apple", "Banana", "Cherry", "Dragon fruit", "Elderberry"];

function ControlledStringList(props: Partial<SortableListProps<string>>) {
    const [items, setItems] = useState(props.items ?? fruits);
    return (
        <SortableList
            items={items}
            getKey={(item) => item}
            onReorder={setItems}
            renderItem={({ item, isDragging }) => (
                <div className={isDragging ? "dragging" : undefined} style={{ padding: "8px 12px", background: "var(--gray50)", border: "1px solid var(--gray400)", borderRadius: 4 }}>
                    {item}
                </div>
            )}
            {...props}
        />
    );
}

const defaultSource = `const fruits = ["Apple", "Banana", "Cherry", "Dragon fruit", "Elderberry"];

function FruitList() {
    const [items, setItems] = useState(fruits);
    return (
        <SortableList
            items={items}
            getKey={(item) => item}
            onReorder={setItems}
            renderItem={({ item, isDragging }) => (
                <div className={isDragging ? "dragging" : undefined}>
                    {item}
                </div>
            )}
        />
    );
}`;

export const Default: Story = {
    parameters: {
        docs: {
            source: {
                code: defaultSource,
            },
        },
    },
    render: () => <ControlledStringList />,
};

const disabledSource = `const fruits = ["Apple", "Banana", "Cherry", "Dragon fruit", "Elderberry"];

function FruitList() {
    const [items, setItems] = useState(fruits);
    return (
        <SortableList
            items={items}
            getKey={(item) => item}
            onReorder={setItems}
            disabled
            renderItem={({ item, isDragging }) => (
                <div className={isDragging ? "dragging" : undefined}>
                    {item}
                </div>
            )}
        />
    );
}`;

export const Disabled: Story = {
    parameters: {
        docs: {
            source: {
                code: disabledSource,
            },
        },
    },
    render: () => <ControlledStringList disabled />,
};

type Task = { id: string; title: string; owner: string };

const tasks: Task[] = [
    { id: "task-1", title: "Design review", owner: "Priya" },
    { id: "task-2", title: "Write release notes", owner: "Sam" },
    { id: "task-3", title: "Fix flaky test", owner: "Jordan" },
    { id: "task-4", title: "Update dependencies", owner: "Alex" },
];

function DragHandleList() {
    const [items, setItems] = useState(tasks);
    return (
        <SortableList
            items={items}
            getKey={(item) => item.id}
            onReorder={setItems}
            renderItem={({ item, isDragging, dropEdge, dragHandleRef }) => (
                <div
                    className={isDragging ? "dragging" : undefined}
                    data-drop-edge={dropEdge ?? undefined}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--white)", border: "1px solid var(--gray400)", borderRadius: 4 }}
                >
                    <span ref={dragHandleRef} style={{ cursor: "grab" }} aria-label="Drag handle">⠿</span>
                    <div style={{ flexGrow: 1 }}>
                        <strong>{item.title}</strong>
                        <div style={{ color: "var(--gray600)", fontSize: 12 }}>{item.owner}</div>
                    </div>
                </div>
            )}
        />
    );
}

const withDragHandleSource = `type Task = { id: string; title: string; owner: string };

const tasks: Task[] = [
    { id: "task-1", title: "Design review", owner: "Priya" },
    { id: "task-2", title: "Write release notes", owner: "Sam" },
    { id: "task-3", title: "Fix flaky test", owner: "Jordan" },
    { id: "task-4", title: "Update dependencies", owner: "Alex" },
];

function DragHandleList() {
    const [items, setItems] = useState(tasks);
    return (
        <SortableList
            items={items}
            getKey={(item) => item.id}
            onReorder={setItems}
            renderItem={({ item, isDragging, dropEdge, dragHandleRef }) => (
                <div className={isDragging ? "dragging" : undefined} data-drop-edge={dropEdge ?? undefined}>
                    <span ref={dragHandleRef} style={{ cursor: "grab" }} aria-label="Drag handle">⠿</span>
                    <div>
                        <strong>{item.title}</strong>
                        <div>{item.owner}</div>
                    </div>
                </div>
            )}
        />
    );
}`;

/**
 * Restricts dragging to a handle by attaching `dragHandleRef` to a specific element instead of the whole item.
 */
export const WithDragHandle: Story = {
    parameters: {
        docs: {
            source: {
                code: withDragHandleSource,
            },
        },
    },
    render: () => <DragHandleList />,
};

function EmptyStateList() {
    const [items, setItems] = useState<string[]>([]);
    return (
        <SortableList
            items={items}
            getKey={(item) => item}
            onReorder={setItems}
            renderItem={({ item }) => <div>{item}</div>}
        />
    );
}

const emptySource = `function EmptyStateList() {
    const [items, setItems] = useState<string[]>([]);
    return (
        <SortableList
            items={items}
            getKey={(item) => item}
            onReorder={setItems}
            renderItem={({ item }) => <div>{item}</div>}
        />
    );
}`;

export const Empty: Story = {
    parameters: {
        docs: {
            source: {
                code: emptySource,
            },
        },
    },
    render: () => <EmptyStateList />,
};

const backlogTasks: Task[] = [
    { id: "task-1", title: "Design review", owner: "Priya" },
    { id: "task-2", title: "Write release notes", owner: "Sam" },
    { id: "task-3", title: "Fix flaky test", owner: "Jordan" },
];

const inProgressTasks: Task[] = [{ id: "task-4", title: "Update dependencies", owner: "Alex" }];

function TaskCard({ item, isDragging }: { item: Task; isDragging: boolean }) {
    return (
        <div
            className={isDragging ? "dragging" : undefined}
            style={{ padding: "8px 12px", background: "var(--white)", border: "1px solid var(--gray400)", borderRadius: 4 }}
        >
            <strong>{item.title}</strong>
            <div style={{ color: "var(--gray600)", fontSize: 12 }}>{item.owner}</div>
        </div>
    );
}

function TwoListBoard() {
    const [backlog, setBacklog] = useState(backlogTasks);
    const [inProgress, setInProgress] = useState(inProgressTasks);

    return (
        <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
                <h4>Backlog</h4>
                <SortableList
                    items={backlog}
                    getKey={(item) => item.id}
                    onReorder={setBacklog}
                    onReceive={(item, atIndex) => setBacklog((current) => [...current.slice(0, atIndex), item, ...current.slice(atIndex)])}
                    renderItem={({ item, isDragging }) => <TaskCard item={item} isDragging={isDragging} />}
                />
            </div>
            <div style={{ flex: 1 }}>
                <h4>In progress</h4>
                <SortableList
                    items={inProgress}
                    getKey={(item) => item.id}
                    onReorder={setInProgress}
                    onReceive={(item, atIndex) => setInProgress((current) => [...current.slice(0, atIndex), item, ...current.slice(atIndex)])}
                    renderItem={({ item, isDragging }) => <TaskCard item={item} isDragging={isDragging} />}
                />
            </div>
        </div>
    );
}

const twoListsSource = `function TwoListBoard() {
    const [backlog, setBacklog] = useState(backlogTasks);
    const [inProgress, setInProgress] = useState(inProgressTasks);

    return (
        <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
                <h4>Backlog</h4>
                <SortableList
                    items={backlog}
                    getKey={(item) => item.id}
                    onReorder={setBacklog}
                    onReceive={(item, atIndex) => setBacklog((current) => [...current.slice(0, atIndex), item, ...current.slice(atIndex)])}
                    renderItem={({ item, isDragging }) => <TaskCard item={item} isDragging={isDragging} />}
                />
            </div>
            <div style={{ flex: 1 }}>
                <h4>In progress</h4>
                <SortableList
                    items={inProgress}
                    getKey={(item) => item.id}
                    onReorder={setInProgress}
                    onReceive={(item, atIndex) => setInProgress((current) => [...current.slice(0, atIndex), item, ...current.slice(atIndex)])}
                    renderItem={({ item, isDragging }) => <TaskCard item={item} isDragging={isDragging} />}
                />
            </div>
        </div>
    );
}`;

/**
 * Two independent SortableLists can exchange items: dropping an item from one list onto the other
 * moves it there, powered by each list's auto-generated `listId` and the `onReceive` callback.
 */
export const TwoLists: Story = {
    parameters: {
        docs: {
            source: {
                code: twoListsSource,
            },
        },
    },
    render: () => <TwoListBoard />,
};

