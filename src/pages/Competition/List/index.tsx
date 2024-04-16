import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import CompetitionCard from '@/pageComponent/Competition/List/Card';
import ApplyDialog from '@/pageComponent/Competition/List/ApplyDialog';
import { Box } from '@mui/material';

import { applyCompetition, listCompetition } from '@/api/competition';
import { listTeam } from '@/api/team';

export default function CompetitionList() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionId, setCompetitionId] = useState<number>(0);
  const [isApplyDialog, setIsApplyDialog] = useState<boolean>(false);
  const [teams, setTeams] = useState<SelectProperty[]>([{ value: '', text: '팀 선택' }]);

  const ref = useRef<HTMLDivElement>(null);

  const hasNextPage = useMemo(() => {
    return page < pageTotal;
  }, [page, pageTotal]);

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) getNextPage();
    });
  };

  const observerOptions = {
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, observerOptions);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);

  useEffect(() => {
    getTeams(1, 100);
  }, []);

  const getNextPage = () => {
    if (!hasNextPage) {
      return;
    }
    if (isFetching) {
      return;
    }
    getList(page + 1);
  };

  const getList = async (newPage: number) => {
    setIsFetching(true);
    const response = await listCompetition(newPage);
    const { page, last_page } = response.meta;
    setCompetitions(response.data);
    setPage(Number(page));
    setPageCount(last_page);
    setIsFetching(false);
  };

  const getTeams = async (newPage: number, itemPerPage: number) => {
    const response = await listTeam(newPage, itemPerPage);
    const selectOptions = response.data.map(team => {
      return {
        value: team.id,
        text: team.name,
      };
    });
    setTeams(selectOptions);
  };

  const clickApplyButton = (id: number) => {
    setCompetitionId(id);
    setIsApplyDialog(true);
  };

  const onSubmitHandler = async (formData: ApplyFormInput) => {
    const body = {
      ...formData,
      competitionId,
    };
    const response = await applyCompetition(body);
    console.log('apply', response);
    if (response === '등록 성공') {
      setIsApplyDialog(false);
    }
  };

  return (
    <>
      <Box display={'flex'} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {competitions.map((competition, index) => {
          return (
            <CompetitionCard
              key={`${competition.name}_${index}`}
              competition={competition}
              onClickApply={clickApplyButton}
              onClick={comp => {
                navigate(`/competition/${comp.id}`);
              }}
            />
          );
        })}
        <div className='Target' ref={ref}></div>
      </Box>
      <ApplyDialog
        teams={teams}
        open={isApplyDialog}
        onClose={() => {
          setIsApplyDialog(false);
        }}
        onConfirm={onSubmitHandler}
      />
    </>
  );
}
