import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditDialog from './EditDialog';

const player: Player = {
  id: 1,
  name: '김선수',
  gender: 'male',
  birth: '1992-02-11',
  picture: '',
};
const open = true;

test('renders learn react link', () => {
  render(<EditDialog player={player} open={open} onClose={() => {}} onConfirm={player => {}} />);
  const linkElement = screen.getByText(/수 수/i);
  expect(linkElement).toBeInTheDocument();
});
