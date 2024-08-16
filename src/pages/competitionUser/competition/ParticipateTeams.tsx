import { useParams } from 'react-router-dom';
import { useCompetitionQuery } from '@/hooks/queries/useCompetitionQuery';

export default function AdminCompetitionDetails() {
  const { competitionId } = useParams();

  const { data: competition, isLoading, error } = useCompetitionQuery(competitionId as string);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading competition details</p>;

  return (
    <div className='container'>
      {competition ? <h1>{competition.name}</h1> : ''}

      <h2>Competition Details TODO</h2>
      <p>1. 대회에 참여한 팀 리스트 불러오기</p>
      <p>2. 조짜기(페이지 이동), 팀 추가 버튼(dialog)</p>
    </div>
  );
}
