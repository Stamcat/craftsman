import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { DatePicker, DatePickerProps, Value } from "../../components/DatePicker";

type ExampleState = {
    selectedDate: Value;
};
class DatePickerExample extends React.PureComponent<DatePickerProps, ExampleState> {
    public state: ExampleState = {
        selectedDate: new Date(),
    };
    protected onChange = (val: Value) => {
        this.setState({ selectedDate: val });
    };
    public render() {
        return <DatePicker value={this.state.selectedDate} onChange={this.onChange} {...this.props} />;
    }
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DatePicker> = {
    title: "Atoms/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    args: {
        value: "01/01/2020",
        format: "d-M-y",
        autoFocus: false,
    },
    argTypes: {
        calendarClassName: {
            control: {
                type: "text",
            },
        },
        className: {
            control: {
                type: "text",
            },
        },
        $error: {
            control: {
                type: "text",
            },
        },
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    render: (props) => <DatePickerExample {...props} />,
    args: {
        $label: "Pick a date",
        $labelPosition: "left",
        $error: "Error message",
    },
    parameters: {
        docs: {
            description: {
                story: "We want you to solve state management of this component however best suits your applications needs. Our example uses a class component with internal state, you could do it that way, but you don't have to!",
            },
        },
    },
};
export const Formatting: Story = {
    args: {
        value: "01/01/2020",
        format: "M-y",
        showLeadingZeros: true,
        view: "year",
        defaultView: "year",
    },
    parameters: {
        docs: {
            description: {
                story: "We want you to solve state management of this component however best suits your applications needs. Our example uses a class component with internal state, you could do it that way, but you don't have to!",
            },
        },
    },
};
