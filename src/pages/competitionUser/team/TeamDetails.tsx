import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import {
  useParticipatePlayersQuery,
  useParticipateTeamInPlayersQuery,
  useAddJoinCompTeamMutation,
  useDeleteJoinCompTeamMutation,
} from '@/hooks/queries/useJoinCompTeamQuery';
import AddParticipatingPlayer from '@/pages/admin/competition/dialog/AddParticipatingPlayer';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './TeamDetails.styles';

export default function ParticipateTeamsDetails() {
  // joinCompId(URL 파라미터)는 참가 ID(participantId)로 사용된다.
  const { joinCompId } = useParams();
  const { selectedCompetition } = useCompetitionStore();
  const competitionId = selectedCompetition || 0;
  const participantId = joinCompId || '';
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: participatePlayers = [], isLoading: isPlayersLoading } = useParticipatePlayersQuery(
    competitionId,
    participantId,
  );
  const { data: team, isLoading: isTeamLoading } = useParticipateTeamInPlayersQuery(competitionId, participantId);
  const addJoinCompTeamMutation = useAddJoinCompTeamMutation(competitionId, participantId);
  const deleteJoinCompTeamMutation = useDeleteJoinCompTeamMutation(competitionId, participantId);

  const allPlayers = team?.players || [];

  const attendingPlayers = allPlayers.map((player: IPlayer) => {
    const isAttend = participatePlayers.some((participatePlayer: IPlayer) => {
      return participatePlayer.id === player.id;
    });
    return { ...player, isAttend };
  });

  const clickAddPlayer = () => {
    setOpenDialog(true);
  };

  const clickHandler = (player: IPlayer) => {
    if (player.id) {
      if (player.isAttend) {
        deleteJoinCompTeamMutation.mutate({ participantId: Number(joinCompId), playerId: player.id });
      } else {
        addJoinCompTeamMutation.mutate({ participantId: Number(joinCompId), playerId: player.id });
      }
    }
  };

  if (isPlayersLoading || isTeamLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <S.Container>
        <S.Top>
          <h5>
            참가팀 &gt;
            <span>{` ${team?.name}`}</span>
          </h5>
        </S.Top>
        <S.Content>
          <S.Header>
            <h5>참가 명단</h5>
            <h5>{participatePlayers.length} 명</h5>
          </S.Header>
          <S.List>
            {participatePlayers.map((player: IPlayer) => {
              return (
                <S.ListItem key={player.id}>
                  {player.uniformNumber ? (
                    <span>{player.uniformNumber}</span>
                  ) : (
                    <span>{player.nickName.charAt(0)}</span>
                  )}
                  <span>{player.nickName}</span>
                </S.ListItem>
              );
            })}
            <S.ListItem>
              <Button variant='text' onClick={clickAddPlayer}>
                <AddIcon />
              </Button>
            </S.ListItem>
          </S.List>
        </S.Content>
      </S.Container>
      <AddParticipatingPlayer
        open={openDialog}
        players={attendingPlayers}
        onClick={clickHandler}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </React.Fragment>
  );
}
