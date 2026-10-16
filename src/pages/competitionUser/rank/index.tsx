import { useEffect, useState } from 'react';

import Loading from '@/components/common/Loading';
import { useGroupstageWithTeamsQuery } from '@/hooks/queries/useGroupstageQuery';
import { useScorersQuery, useStandingsQuery } from '@/hooks/queries/useStandingsQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Rank.styles';

export default function CompetitionRank() {
  const { selectedCompetition } = useCompetitionStore();
  const competitionId = selectedCompetition || 0;

  const { data: groups = [], isLoading: isGroupsLoading } = useGroupstageWithTeamsQuery(competitionId);
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  // 조 목록이 로드되면 첫 조를 기본 선택
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0].name);
    }
  }, [groups, selectedGroup]);

  const { data: standings, isLoading: isStandingsLoading } = useStandingsQuery(competitionId, selectedGroup);
  const { data: scorers = [], isLoading: isScorersLoading } = useScorersQuery(competitionId);

  if (!competitionId) {
    return (
      <S.Container>
        <S.Empty>대회를 선택하세요.</S.Empty>
      </S.Container>
    );
  }

  if (isGroupsLoading) return <Loading />;

  return (
    <S.Container>
      <S.Title>순위 / 득점 랭킹</S.Title>

      {/* 조별 순위 */}
      <S.Section>
        <S.SectionTitle>조별 순위</S.SectionTitle>

        <S.Tabs>
          {groups.map(group => (
            <S.Tab key={group.id} $active={group.name === selectedGroup} onClick={() => setSelectedGroup(group.name)}>
              {group.name}조
            </S.Tab>
          ))}
        </S.Tabs>

        {isStandingsLoading ? (
          <Loading />
        ) : !standings || standings.standings.length === 0 ? (
          <S.Empty>순위 데이터가 없습니다.</S.Empty>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <S.Th>순위</S.Th>
                <S.Th style={{ textAlign: 'left' }}>팀</S.Th>
                <S.Th>경기</S.Th>
                <S.Th>승</S.Th>
                <S.Th>무</S.Th>
                <S.Th>패</S.Th>
                <S.Th>득실</S.Th>
                <S.Th>승점</S.Th>
              </tr>
            </thead>
            <tbody>
              {standings.standings.map((row, index) => (
                <tr key={row.teamId}>
                  <S.Td>
                    <S.RankBadge $top={index === 0}>{index + 1}</S.RankBadge>
                  </S.Td>
                  <S.TeamCell>{row.teamName}</S.TeamCell>
                  <S.Td>{row.played}</S.Td>
                  <S.Td>{row.won}</S.Td>
                  <S.Td>{row.draw}</S.Td>
                  <S.Td>{row.lost}</S.Td>
                  <S.Td>
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </S.Td>
                  <S.Td $strong>{row.points}</S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.Section>

      {/* 득점 랭킹 */}
      <S.Section>
        <S.SectionTitle>득점 랭킹</S.SectionTitle>
        {isScorersLoading ? (
          <Loading />
        ) : scorers.length === 0 ? (
          <S.Empty>득점 기록이 없습니다.</S.Empty>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <S.Th>순위</S.Th>
                <S.Th style={{ textAlign: 'left' }}>선수</S.Th>
                <S.Th style={{ textAlign: 'left' }}>팀</S.Th>
                <S.Th>득점</S.Th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((scorer, index) => (
                <tr key={scorer.playerId}>
                  <S.Td>
                    <S.RankBadge $top={index === 0}>{index + 1}</S.RankBadge>
                  </S.Td>
                  <S.TeamCell>{scorer.playerName}</S.TeamCell>
                  <S.Td style={{ textAlign: 'left' }}>{scorer.teamName}</S.Td>
                  <S.Td $strong>{scorer.goalCount}</S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.Section>
    </S.Container>
  );
}
