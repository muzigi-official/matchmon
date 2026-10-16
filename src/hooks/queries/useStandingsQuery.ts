import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { fetchScorers } from '@/api/scorers';
import { fetchStandings } from '@/api/standings';
import { standingsQueryKeys } from '@/queryKeys/standings';

export const useStandingsQuery = (competitionId: number, groupLabel: string) => {
  return useQuery<IStandingsDto, AxiosError>(
    standingsQueryKeys.standings(competitionId, groupLabel),
    () => fetchStandings(competitionId, groupLabel),
    { enabled: !!competitionId && !!groupLabel },
  );
};

export const useScorersQuery = (competitionId: number) => {
  return useQuery<IScorerDto[], AxiosError>(
    standingsQueryKeys.scorers(competitionId),
    () => fetchScorers(competitionId),
    { enabled: !!competitionId },
  );
};
