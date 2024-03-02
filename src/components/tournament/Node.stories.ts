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
    teamNameA: '강북풋살팀',
    teamNameB: '강남풋살팀',
    scoreA: 4,
    scoreB: 2,
    round: 8,
    gameOrder: 4,
    x: 100,
    y: 100,
  },
};
