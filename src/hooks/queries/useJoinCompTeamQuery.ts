import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { fetchParticipateTeams } from '@/api/joinCompTeam';
import { joinTeamCompQueryKeys } from '@/queryKeys/joinCompTeam';

export const useJoinCompTeamsQuery = (competitionId: number) => {
  return useQuery<IListJoinTeamCompResponse[], AxiosError<IErrorResponse>>(
    joinTeamCompQueryKeys.joinTeamComp(competitionId),
    () => fetchParticipateTeams(competitionId),
  );
};
