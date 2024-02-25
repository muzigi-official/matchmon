import type { Meta, StoryObj } from '@storybook/react';

import Layout from './Layout';

const meta = {
  title: 'tournament/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalNodeCount: 16,
  },
};
