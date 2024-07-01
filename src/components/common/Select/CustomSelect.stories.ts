import type { Meta, StoryObj } from '@storybook/react';

import Select from './CustomSelect';

const meta = {
  title: 'Components/common/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'SelectBox의 Option값들의 배열',
    },
    label: {
      control: 'string',
      description: 'SelectBox의 라벨을 결정합니다.',
      defaultValue: '과일',
    },
  },
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSelect: Story = {
  args: {
    options: ['사과', '오렌지', '포도', '수박'],
    label: '과일',
    onSelect: () => {},
  },
};
