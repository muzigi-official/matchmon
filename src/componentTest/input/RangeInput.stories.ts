import type { Meta, StoryObj } from '@storybook/react';

import RangeInput from './RangeInput';
import { timeData } from '@/constant/time';

const meta = {
  title: 'Components/RangeInput',
  component: RangeInput,
  parameters: {
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstOptions: timeData(),
    secondOptions: timeData(),
  },
};
