import { useState, useMemo } from 'react';
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

import * as S from './TeamDetails.styles';
import React from 'react';

export default function ParticipateTeamsDetails() {
  const { joinCompId } = useParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: participatePlayers = [], isLoading: isPlayersLoading } = useParticipatePlayersQuery(joinCompId || '');
  const { data: team, isLoading: isTeamLoading } = useParticipateTeamInPlayersQuery(joinCompId || '');
  const addJoinCompTeamMutation = useAddJoinCompTeamMutation();
  const deleteJoinCompTeamMutation = useDeleteJoinCompTeamMutation();

  const allPlayers = team?.players || [];

  const attendingPlayers = useMemo(() => {
    return allPlayers.map((player: IPlayer) => {
      const isAttend = participatePlayers.some(participatePlayer => {
        return participatePlayer.id === player.id;
      });
      return { ...player, isAttend };
    });
  }, [participatePlayers, allPlayers]);

  const clickAddPlayer = () => {
    setOpenDialog(true);
  };

  const clickHandler = (player: IPlayer) => {
    if (player.id) {
      if (player.isAttend) {
        deleteJoinCompTeamMutation.mutate({ joinTeamCompId: Number(joinCompId), playerId: player.id });
      } else {
        addJoinCompTeamMutation.mutate({ joinTeamCompId: Number(joinCompId), playerId: player.id });
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
            {participatePlayers.map(player => {
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
