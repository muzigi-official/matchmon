import type { Meta, StoryObj } from '@storybook/react';

import DateRangePicker from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/common/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultDateRangePicker: Story = {
  args: {},
};
