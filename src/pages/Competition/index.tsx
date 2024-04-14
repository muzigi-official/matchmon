import { createTournament, getTournamentList } from '@/api/tournament';
import TournamentLayout from '@/components/tournament/Layout';

import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as _ from 'lodash';

export default function Competition() {
  const { competitionId } = useParams();
  const [round, setRound] = useState<string>('8');
  const [tournaments, setTournaments] = useState<Tournaments>({});

  useEffect(() => {
    handleGetTournaments();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setRound(event.target.value as string);
  };
  const handleCreateTournament = async () => {
    if (competitionId) {
      await createTournament({ competitionId: competitionId, numberOfTeam: round });
    }
  };
  const handleGetTournaments = async () => {
    if (!competitionId) {
      return;
    }
    const data = await getTournamentList(competitionId);

    if (data.tournaments) {
      const groupedTournaments = _.groupBy(data.tournaments, 'groupKey');
      setTournaments(groupedTournaments);
    } else {
      setTournaments({});
    }
  };

  return (
    <>
      <h1>Competition: {competitionId}</h1>
      <Grid container>
        <Grid xs={12}>
          <Button onClick={() => {}} variant='outlined'>
            참가 신청
          </Button>
          <Button onClick={() => {}} variant='outlined'>
            참가 신청 목록 불러오기
          </Button>
          <h2>참가 허락/거절 프로세스</h2>
        </Grid>

        <Grid xs={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>number</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={round}
              label='number'
              onChange={handleChange}
            >
              <MenuItem value={2}>2강</MenuItem>
              <MenuItem value={4}>4강</MenuItem>
              <MenuItem value={8}>8강</MenuItem>
              <MenuItem value={16}>16강</MenuItem>
              <MenuItem value={32}>32강</MenuItem>
              <MenuItem value={64}>64강</MenuItem>
              <MenuItem value={128}>128강</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={3}>
          <Button onClick={handleCreateTournament} variant='outlined'>
            토너먼트 생성
          </Button>
          <Button onClick={handleGetTournaments} variant='outlined'>
            토너먼트 가져오기
          </Button>
        </Grid>
        {Object.keys(tournaments).map(key => {
          const tournament = tournaments[key];
          const maxRound = tournament[0].size / 2;
          return (
            <Grid xs={12} key={key}>
              <TournamentLayout round={maxRound} nodeInfoList={tournament}></TournamentLayout>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
