import { TableCell, TableRow } from './Tables.style';

interface IMatchViewFieldProps {
  match: IMatchScheduleDto;
}

const MatchViewField = ({ match }: IMatchViewFieldProps) => {
  return (
    <TableRow>
      <TableCell>{match.matchTime}</TableCell>
      <TableCell>{match.stadium}</TableCell>
      <TableCell>{match.homeTeamName}</TableCell>
      <TableCell>{match.awayTeamName}</TableCell>
    </TableRow>
  );
};

export default MatchViewField;
