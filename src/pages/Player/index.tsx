import { Stack, Box } from '@mui/material';
import BasicTable from 'src/components/table/BasicTable';

const headerSample = ['이름', '선출여부', '성별', '연령대', '프사', '대표팀'];

const makeRow = (이름: string, 선출여부: string, 성별: string, 연령대: string, 프사: string, 대표팀: string) => {
  return { 이름, 선출여부, 성별, 연령대, 프사, 대표팀 };
};
const rowsSample = [
  { 이름: 'nameA', 선출여부: 'X', 성별: 'M', 연령대: '20', 프사: '없음', 대표팀: 'FC' },
  makeRow('nameB', 'O', 'F', '30', '있음', 'FC'),
  makeRow('nameB', 'O', 'F', '30', '있음', 'FC'),
  makeRow('nameB', 'O', 'F', '30', '있음', 'FC'),
];

export default function Player() {
  return (
    <Box alignContent='center' paddingX='15px'>
      <Stack>
        <h1>Player</h1>
      </Stack>
      <Stack> Filter </Stack>
      <Stack>
        <BasicTable header={headerSample} rows={rowsSample} />
      </Stack>
      <Stack> Pagination </Stack>
    </Box>
  );
}
