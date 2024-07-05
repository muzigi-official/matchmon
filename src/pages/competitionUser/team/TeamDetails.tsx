import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { addJoinTeam, getParticipatPlayers, getParticipateTeamInPlayers, removeJoinTeam } from '@/api/joinTeamComp';
import Button from '@/components/common/Button';
import AddParticipatingDialog from '@/components/admin/competition/dialog/AddAttendTeam';
import AddIcon from '@mui/icons-material/Add';
import * as S from './TeamDetails.style';

export default function ParticipateTeamsDetails() {
  const { joinCompId } = useParams();
  const [participatePlayers, setParticipatePlayers] = useState<IPlayer[]>([]);
  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([]);
  const [team, setTeam] = useState<ITeam | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (joinCompId) {
      initialrise(joinCompId);
    }
  }, []);

  const attendingPlayers = useMemo(() => {
    return allPlayers.map((player: IPlayer) => {
      const isAttend = participatePlayers.some(participatePlayer => {
        return participatePlayer.id === player.id;
      });
      return { ...player, isAttend };
    });
  }, [participatePlayers, allPlayers]);

  const initialrise = async (joinCompId: string) => {
    await fetchParticipatePlayers(joinCompId);
    await fetchParticipateTeams(joinCompId);
  };

  const fetchParticipatePlayers = async (joinCompId: string) => {
    if (joinCompId) {
      const response = await getParticipatPlayers(joinCompId);
      setParticipatePlayers(response);
    }
  };

  const fetchParticipateTeams = async (joinCompId: string) => {
    const response = await getParticipateTeamInPlayers(joinCompId);
    setTeam(response);
    if (response.players) {
      setAllPlayers(response.players);
    }
  };

  const clickHandler = async (player: IPlayer) => {
    if (player.id) {
      if (player.isAttend) {
        const response = await removeJoinTeam({ joinTeamCompId: Number(joinCompId), playerId: player.id });
        if (response) {
          const updatedItems = participatePlayers.filter(item => item.nickName !== player.nickName);
          setParticipatePlayers(updatedItems);
        }
      } else {
        const response = await addJoinTeam({ joinTeamCompId: Number(joinCompId), playerId: player.id });
        if (response) {
          setParticipatePlayers(prevList => {
            return [...prevList, { ...player, isAttend: true }];
          });
        }
      }
    }
  };

  const clickAddPlayer = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h5>
            참가팀 &gt;
            <span>{team?.name}</span>
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
      <AddParticipatingDialog
        open={openDialog}
        players={attendingPlayers}
        onClick={clickHandler}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
}
