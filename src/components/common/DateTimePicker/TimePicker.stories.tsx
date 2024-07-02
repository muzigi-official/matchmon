import type { Meta, StoryObj } from '@storybook/react';

import TimePicker from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/common/picker/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTimePicker: Story = {
  args: {},
};
