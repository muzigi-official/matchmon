import type { Meta, StoryObj } from '@storybook/react';

import NodeV2 from './NodeV2';
import { baseHeight, baseWidth } from './Layout';

const meta = {
  title: 'tournament/NodeV2',
  component: NodeV2,
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  args: {},
} satisfies Meta<typeof NodeV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2015-02-24 12:30',
    emblemA: undefined,
    emblemB: undefined,
    teamNameA: '강북풋살팀',
    teamNameB: '강남풋살팀',
    scoreA: 4,
    scoreB: 2,
    round: 8,
    gameOrder: 4,
    x: 100,
    y: 100,
    width: baseWidth.x,
    height: baseHeight.y,
  },
};
