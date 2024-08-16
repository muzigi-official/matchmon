import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: '탭 리스트의 정보를 담고 있는 배열',
    },
    selectedTab: {
      control: 'text',
      description: '선택된 탭의 value를 나타낸다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const DefaultTabs: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', content: 'Content 1' },
      { label: 'Tab 2', content: 'Content 2' },
      { label: 'Tab 3', content: 'Content 3' },
    ],
    selectedTab: 'Tab 1',
    onTabClick: (label: string) => {
      console.log(`Tab clicked: ${label}`);
    },
  },
};
