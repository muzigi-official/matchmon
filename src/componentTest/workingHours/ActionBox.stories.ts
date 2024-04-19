import type { Meta, StoryObj } from '@storybook/react';

import ActionBox from './ActionBox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Page/Components/ActionBox',
  component: ActionBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    item: {
      description: '버튼의 스타일을 결정해 주는 값',
      defaultValue: { order: 1, startTime: '09:00', endTime: '12:00'},
    },
    isLast: {
      control: 'boolean',
      description: 'item의 마지막 값인지 확인하는 것 추가 버튼 유무가 여기에 달렸다.',
    }
  },
  args: {},
} satisfies Meta<typeof ActionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultButton: Story = {
  args: {
    item: { order: 1, startTime: '09:00', endTime: '12:00'},
    isLast: false,
    onAdd: () => {},
    onRemove: (order: number) => {},
    onChange: (value: string | number) => {},
  },
};