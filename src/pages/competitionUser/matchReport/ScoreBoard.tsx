import { useState } from 'react';
import Button from '@/components/common/Button';

import * as S from './ScoreBoard.styles'; // 스타일 컴포넌트를 불러옴

// Example data (replace with API data)
const initialHomePlayers = [
  { id: 1, name: '아이유', goals: 3 },
  { id: 2, name: '강남길', goals: 0 },
  { id: 3, name: '동블리', goals: 0 },
  { id: 4, name: '봉준호', goals: 2 },
  { id: 5, name: '파이리', goals: 0 },
  { id: 1, name: '꼬부기', goals: 3 },
  { id: 2, name: '임영웅', goals: 0 },
  { id: 3, name: '류새아라', goals: 0 },
  { id: 4, name: '도토리', goals: 2 },
  { id: 5, name: '지니', goals: 0 },
];

const initialAwayPlayers = [
  { id: 6, name: '임하농', goals: 0 },
  { id: 7, name: '김철수', goals: 1 },
  { id: 8, name: '박영희', goals: 0 },
  { id: 9, name: '정민수', goals: 0 },
  { id: 10, name: '이기자', goals: 0 },
];

// Main Component
export default function MatchScoreKeeper() {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [homePlayers, setHomePlayers] = useState(initialHomePlayers);
  const [awayPlayers, setAwayPlayers] = useState(initialAwayPlayers);
  const [homeScores, setHomeScores] = useState(5);
  const [awayScores, setAwayScores] = useState(1);

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
    setHomePlayers(initialHomePlayers);
    setAwayPlayers(initialAwayPlayers);
    setHomeScores(0);
    setAwayScores(0);
  };

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

      <S.PlayerListContainer>
        <S.PlayerList visible={selectedTeam === 'home'}>{renderPlayerList('home')}</S.PlayerList>
        <S.PlayerList visible={selectedTeam === 'away'}>{renderPlayerList('away')}</S.PlayerList>
      </S.PlayerListContainer>

      <S.ScoreBoard>
        {homeScores} : {awayScores}
      </S.ScoreBoard>
    </S.Container>
  );
}
