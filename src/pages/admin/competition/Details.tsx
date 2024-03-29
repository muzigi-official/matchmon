import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompetition } from '@/api/competition';
// import './index.scoped.css';

export default function AdminCompetitionDetails() {
  const { competitionId } = useParams();
  // const [competition, setCompetition] = useState();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    console.log('what?', competitionId);
    if (competitionId) {
      const response = await getCompetition(competitionId);
      console.log(response);
      // setCompetition(response);
    }
  };

  return (
    <div className='container'>
      {/* {competition.name} */}
      <h1>{competitionId} 팀</h1>
      <h2>competition Details TODO</h2>
      <p>1. 대회 팀 리스트 불러오기</p>
      <p>2. 대회 생성 페이지 링크 만들기</p>
    </div>
  );
}
