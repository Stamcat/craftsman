import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Pagination } from "../../components/Pagination/Pagination";

const meta: Meta<typeof Pagination> = {
    title: "Molecules/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    args: {
        total: 50,
        current: 0,
        showPages: 5,
    },
    argTypes: {
        total: { control: "number" },
        current: { control: false },
        showPages: { control: "number" },
        onChange: { control: false },
        className: { control: false },
        style: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function ControlledPagination(props: React.ComponentProps<typeof Pagination>) {
    const [current, setCurrent] = useState(props.current ?? 0);
    const onChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrent(parseInt(e.currentTarget.value, 10) || 0);
    };
    return <Pagination {...props} current={current} onChange={onChange} />;
}

export const Default: Story = {
    render: (args) => <ControlledPagination {...args} />,
};

export const FewPages: Story = {
    render: (args) => <ControlledPagination {...args} />,
    args: { total: 3 },
};

export const NarrowWindow: Story = {
    render: (args) => <ControlledPagination {...args} />,
    args: { total: 50, showPages: 3 },
};
