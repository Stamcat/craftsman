import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../../components/Loader/Loader';
import { LoaderStyleSchema } from '../../components/Loader/types';

const meta: Meta<typeof Loader> = {
	title: 'Atoms/Loader',
	component: Loader,
	tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        type: {
            control: "select",
            options: LoaderStyleSchema.options,
        },
        width: {
            control: "number"
        }
    },
    args: {
        type: "dots",
        color: "black",
        width: undefined,
    }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Basic: Story = {
	args: {},
};
