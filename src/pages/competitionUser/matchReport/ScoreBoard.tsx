import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';

import * as S from './ScoreBoard.styles'; // 스타일 컴포넌트를 불러옴

interface IResultPlayer {
  id: number;
  name: string;
  uniformNumber: number;
  goals: number;
}

interface IMatchScoreProps {
  homeTeamPlayers: IResultPlayer[];
  awayTeamPlayers: IResultPlayer[];
}

export default function MatchScoreKeeper({ homeTeamPlayers, awayTeamPlayers }: IMatchScoreProps) {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [homePlayers, setHomePlayers] = useState<IResultPlayer[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<IResultPlayer[]>([]);
  const [homeScores, setHomeScores] = useState(0);
  const [awayScores, setAwayScores] = useState(0);

  const handleSelectTeam = (team: 'home' | 'away') => {
    setSelectedTeam(team);
  };

  const handleGoalChange = (team: 'home' | 'away', playerId: number, delta: number) => {
    if (team === 'home') {
      const updatedPlayers = homePlayers.map(player => {
        if (player.id === playerId) {
          const updatedGoals = player.goals + delta >= 0 ? player.goals + delta : 0;
          return { ...player, goals: updatedGoals };
        }
        return player;
      });
      setHomePlayers(updatedPlayers);
      setHomeScores(homeScores + delta >= 0 ? homeScores + delta : homeScores);
    } else {
      const updatedPlayers = awayPlayers.map(player => {
        if (player.id === playerId) {
          const updatedGoals = player.goals + delta >= 0 ? player.goals + delta : 0;
          return { ...player, goals: updatedGoals };
        }
        return player;
      });
      setAwayPlayers(updatedPlayers);
      setAwayScores(awayScores + delta >= 0 ? awayScores + delta : awayScores);
    }
  };

  const handleReset = () => {
    // 모든 선수의 골 수를 0으로 초기화
    setHomePlayers(homePlayers.map(player => ({ ...player, goals: 0 })));
    setAwayPlayers(awayPlayers.map(player => ({ ...player, goals: 0 })));

    // 스코어보드 점수 초기화
    setHomeScores(0);
    setAwayScores(0);
  };

  useEffect(() => {
    if (homeTeamPlayers) {
      setHomePlayers(homeTeamPlayers);
    }
  }, [homeTeamPlayers]);

  useEffect(() => {
    if (awayTeamPlayers) {
      setAwayPlayers(awayTeamPlayers);
    }
  }, [awayTeamPlayers]);

  const renderPlayerList = (team: 'home' | 'away') => {
    const players = team === 'home' ? homePlayers : awayPlayers;

    return players.map(player => (
      <S.PlayerItem key={player.id}>
        <S.PlayerName>{player.name}</S.PlayerName>
        <S.GoalControl>
          <Button variant='outlined' color='primary' onClick={() => handleGoalChange(team, player.id, -1)}>
            -
          </Button>
          <S.GoalCount>{`⚽️ ${player.goals}`}</S.GoalCount>
          <Button variant='outlined' color='primary' onClick={() => handleGoalChange(team, player.id, 1)}>
            +
          </Button>
        </S.GoalControl>
      </S.PlayerItem>
    ));
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.TabButton selected={selectedTeam === 'home'} onClick={() => handleSelectTeam('home')}>
            홈
          </S.TabButton>
          <S.TabButton selected={selectedTeam === 'away'} onClick={() => handleSelectTeam('away')}>
            어웨이
          </S.TabButton>
        </div>
        <Button variant='outlined' color='error' onClick={handleReset}>
          초기화
        </Button>
      </S.TopBar>

      <S.ScoreBoard>
        {homeScores} : {awayScores}
      </S.ScoreBoard>

      <S.PlayerListContainer>
        <S.PlayerList $visible={selectedTeam === 'home'}>{renderPlayerList('home')}</S.PlayerList>
        <S.PlayerList $visible={selectedTeam === 'away'}>{renderPlayerList('away')}</S.PlayerList>
      </S.PlayerListContainer>
    </S.Container>
  );
}
