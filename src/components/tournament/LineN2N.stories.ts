import type { Meta, StoryObj } from '@storybook/react';

import LineN2N from './LineN2N';
import { Coordinate } from './Layout';

const meta = {
  title: 'tournament/LineN2N',
  component: LineN2N,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof LineN2N>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeA: Story = {
  args: {
    start: new Coordinate(100, 100),
    end: new Coordinate(300, 200),
  },
};

export const TypeB: Story = {
  args: {
    start: new Coordinate(100, 300),
    end: new Coordinate(300, 200),
  },
};

export const TypeC: Story = {
  args: {
    start: new Coordinate(500, 100),
    end: new Coordinate(300, 200),
  },
};

export const TypeD: Story = {
  args: {
    start: new Coordinate(500, 300),
    end: new Coordinate(300, 200),
  },
};
