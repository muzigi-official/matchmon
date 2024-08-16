import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPage: {
      control: 'number',
      description: '페이지의 전체 개수를 나타냅니다.',
      defaultValue: 10,
    },
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호를 나타냅니다.',
      defaultValue: 1,
    },
  },
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    totalPage: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
};
