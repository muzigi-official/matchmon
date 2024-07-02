import type { Meta, StoryObj } from '@storybook/react';

import DateTimePicker from './DateTimePicker';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/common/picker/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDateTimePicker: Story = {
  args: {},
};

const dateMeta: Meta<typeof DatePicker> = {
  title: 'Components/common/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export const DefaultDatePicker: StoryObj<typeof dateMeta> = {
  args: {},
};

const timeMeta: Meta<typeof TimePicker> = {
  title: 'Components/common/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export const DefaultTimePicker: StoryObj<typeof timeMeta> = {
  args: {},
};
