import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/common/picker/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDatePicker: Story = {
  args: {},
};
