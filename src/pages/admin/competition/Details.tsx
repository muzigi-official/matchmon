import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompetition } from '@/api/competition';

export default function AdminCompetitionDetails() {
  const { competitionId } = useParams();
  const [competition, setCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (competitionId) {
      const response = await getCompetition(competitionId);
      console.log(response);
      setCompetition(response);
    }
  };

  return (
    <div className='container'>
      {competition ? <h1>{competition.name} </h1> : ''}

      <h2>competition Details TODO</h2>
      <p>1. 대회에 참여한 팀 리스트 불러오기</p>
      <p>2. 조짜기(페이지 이동), 팀 추가 버튼(dialog)</p>
    </div>
  );
}
