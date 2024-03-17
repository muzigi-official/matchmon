import type { Meta, StoryObj } from '@storybook/react';

import Line from './Line';

const meta = {
  title: 'tournament/Line',
  component: Line,
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  args: {},
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 가로선: Story = {
  args: {
    x: 100,
    y: 100,
    width: 100,
    height: 2,
  },
};

export const 세로선: Story = {
  args: {
    x: 100,
    y: 100,
    width: 2,
    height: 100,
  },
};
