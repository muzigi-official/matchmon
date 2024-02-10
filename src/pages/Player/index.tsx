import { useState, useEffect } from 'react';

import { Stack, Box, Pagination, Typography } from '@mui/material';

import { useMatches, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import PlayerCard from '@/pageComponent/Player/PlayerCard';
import DataTable from '@/components/table/DataTable';
import BasicTable from '@/components/table/BasicTable';
import { getPlayer } from '@/api/player';

const headerSample = ['대회명', '상태', '일자'];
const rows = [
  { 대회명: '전북풋살', 상태: '참가신청', 일자: '2024.03.02' },
  { 대회명: '전북풋살', 상태: '참가중', 일자: '2024.02.10' },
  { 대회명: '전북풋살', 상태: '종료', 일자: '2023.08.12' },
];

export default function Player() {
  const matches = useMatches();
  const playerId = matches[0].params.playerId;
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (playerId) {
      getPlayerDetail(playerId);
    }
  }, []);

  const getPlayerDetail = async (id: number | string) => {
    const response = await getPlayer(id);
    setPlayer(response.player);
  };

  return (
    <Grid container>
      <Grid xs={3} padding={2} alignItems={'center'} justifyItems={'center'}>
        <PlayerCard player={player || undefined} />
      </Grid>
      <Grid xs={9} padding={2} alignItems={'center'} justifyItems={'center'}>
        <Grid xs={12} padding={1}>
          <Typography variant='h5'>참가한 대회 목록</Typography>
        </Grid>
        <Grid xs={12} padding={1}>
          <BasicTable header={headerSample} rows={rows} />
        </Grid>
      </Grid>
    </Grid>
  );
}
