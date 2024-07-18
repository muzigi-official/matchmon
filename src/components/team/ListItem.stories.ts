import type { Meta, StoryObj } from '@storybook/react';

import ListItem from './ListItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/team/ListItem',
  component: ListItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    id: {
      control: 'none',
      description: '팀 id',
    },
    name: {
      control: 'none',
      description: '팀 이름',
    },
    emblem: {
      control: 'none',
      description: '팀 엠블럼',
    },
  },
  args: {},
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultListItem: Story = {
  args: {
    id: 1,
    name: 'FS 눈누난나',
    emblem: '',
  },
};
