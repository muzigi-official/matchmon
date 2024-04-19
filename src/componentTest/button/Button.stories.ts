import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      description: '버튼 안에 넣을 수 있는 Child 값',
      defaultValue: '"Button"',
    },
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
      description: '버튼의 스타일을 결정해 주는 값',
      defaultValue: 'contained',
    },
    selected: {
      control: 'boolean',
      description: 'button이 눌렸는지 안눌렸는지 체크해주는 값',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'button이 disabled 처리를 하고 싶을 때 넣어주는 값',
      defaultValue: false
    }
  },
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultButton: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    disabled: false
  },
};

export const outlinedButton: Story = {
  args: {
    children: 'outlined Button',
    variant: 'outlined',
  },
};

export const textButton: Story = {
  args: {
    children: 'Text',
    variant: 'text',
  },
};
