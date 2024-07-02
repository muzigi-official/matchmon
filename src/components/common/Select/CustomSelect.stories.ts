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
    options: [
      { text: '사과', value: '사과' },
      { text: '오렌지', value: '오렌지' },
      { text: '포도', value: '포도' },
      { text: '수박', value: '수박' },
    ],
    defaultValue: '사과',
    label: '과일',
    onSelect: () => {},
  },
};
