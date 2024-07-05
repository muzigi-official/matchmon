import type { Meta, StoryObj } from '@storybook/react';

import AddParticipatingDialog from './AddAttendTeam';
import ADD_PLAYERS from '@/Mocks/AddPlayers.data.json';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'page/Compoents/admin/competition/team/AddParticipatingDialog',
  component: AddParticipatingDialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<typeof AddParticipatingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddCompetitionDialog: Story = {
  args: {
    open: true,
    onClose: () => {},
    players: ADD_PLAYERS,
    onClick: () => {},
  },
};
