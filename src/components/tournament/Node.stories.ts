import type { Meta, StoryObj } from '@storybook/react';

import Node from './Node';

const meta = {
  title: 'tournament/Node',
  component: Node,
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  args: {},
} satisfies Meta<typeof Node>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2015-02-24 12:30',
    team1: '강북풋살팀',
    team2: '강남풋살팀',
    score1: 4,
    score2: 2,
    nodeName: '8강 4경기',
  },
};
