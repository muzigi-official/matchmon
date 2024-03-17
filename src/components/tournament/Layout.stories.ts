import type { Meta, StoryObj } from '@storybook/react';

import Layout, { makeNodeProps } from './Layout';

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

const sampleNodePropsList = [
  makeNodeProps(2, 1, '2024.02.24 10:00', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(4, 1, '2024.02.22 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(4, 2, '2024.02.22 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 1, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 2, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 3, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(8, 4, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 1, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 2, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 3, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 4, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 5, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 6, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 7, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
  makeNodeProps(16, 8, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
];

export const Default: Story = {
  args: {
    round: 8,
    nodeInfoList: [
      makeNodeProps(2, 1, '2024.02.24 10:00', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(4, 1, '2024.02.22 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(4, 2, '2024.02.22 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(8, 1, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(8, 2, '2024.02.20 10:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(8, 3, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
      makeNodeProps(8, 4, '2024.02.20 12:30', '전북 풋살팀', '전남 풋살팀', 0, 0),
    ],
  },
};
