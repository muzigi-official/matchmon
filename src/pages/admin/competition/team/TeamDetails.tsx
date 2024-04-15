import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getParticipatPlayers, getParticipateTeamInPlayers } from '@/api/joinTeamComp';
import MyButton from '@/components/button/MyButton';
import AddParticipatingDialog from '@/pageComponent/admin/competition/team/AddParticipatingDialog';
import AddIcon from '@mui/icons-material/Add';
import * as S from './Container.style';

export default function ParticipateTeamsDetails() {
  const { joinCompId } = useParams();
  const [attendingPlayers, setAttendingPlayers] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (joinCompId) {
      fetchParticipatePlayers(joinCompId);
      fetchParticipateTeams(joinCompId);
    }
  }, []);

  const fetchParticipateTeams = async (joinCompId: string) => {
    const response = await getParticipateTeamInPlayers(joinCompId);
    setTeam(response);
    if (response.players) {
      const allPlayersWithAttendance = response.players.map(player => {
        const isAttend = attendingPlayers.some(attendingPlayer => attendingPlayer.id === player.id);
        return { ...player, isAttend };
      });

      setAllPlayers(allPlayersWithAttendance);
    }
  };

  const fetchParticipatePlayers = async (joinCompId: string) => {
    if (joinCompId) {
      const response = await getParticipatPlayers(joinCompId);
      setAttendingPlayers(response);
    }
  };

  const clickAddPlayer = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h5>참가팀 &gt; {team?.name} </h5>
        </S.Top>
        <S.Content>
          <S.Header>
            <h5>참가 명단</h5>
            <h5>{attendingPlayers.length} 명</h5>
          </S.Header>
          <S.List>
            {attendingPlayers.map(player => {
              return (
                <S.ListItem key={player.id}>
                  {player.uniformNumber ? <span>{player.uniformNumber}</span> : player.nickName.charAt(0)}
                  <span>{player.nickName}</span>
                </S.ListItem>
              );
            })}
            <S.ListItem>
              <MyButton variant='text' onClick={clickAddPlayer}>
                <AddIcon />
              </MyButton>
            </S.ListItem>
          </S.List>
        </S.Content>
      </S.Container>
      <AddParticipatingDialog
        open={openDialog}
        players={allPlayers}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
}
