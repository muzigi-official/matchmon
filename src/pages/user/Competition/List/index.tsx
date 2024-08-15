import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import CompetitionCard from '@/components/competition/Card';
import ApplyDialog from '@/components/competition/ApplyDialog';
import { useTeamListQuery } from '@/hooks/queries/useTeamQuery';

import { applyCompetition, listCompetition } from '@/api/competition';

const PAGE_SIZE = 100;

export default function CompetitionList() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [competitionId, setCompetitionId] = useState<number>(0);
  const [isApplyDialog, setIsApplyDialog] = useState<boolean>(false);
  const [teams, setTeams] = useState<ISelectProperty[]>([{ value: '', text: '팀 선택' }]);

  const { data: teamData, isLoading: isTeamLoading, error: teamError } = useTeamListQuery(page, PAGE_SIZE);

  const ref = useRef<HTMLDivElement>(null);

  const getList = async (newPage: number) => {
    setIsFetching(true);
    const response = await listCompetition(newPage);
    const { page, last_page } = response.meta;
    setCompetitions(response.data);
    setPage(Number(page));
    setPageCount(last_page);
    setIsFetching(false);
  };

  const clickApplyButton = (id: number) => {
    setCompetitionId(id);
    setIsApplyDialog(true);
  };

  const onSubmitHandler = async (formData: IApplyFormInput) => {
    const body = {
      ...formData,
      competitionId,
    };
    const response = await applyCompetition(body);
    if (response === '등록 성공') {
      setIsApplyDialog(false);
    }
  };

  const hasNextPage = useMemo(() => {
    return page < pageTotal;
  }, [page, pageTotal]);

  const getNextPage = () => {
    if (!hasNextPage) {
      return;
    }
    if (isFetching) {
      return;
    }
    getList(page + 1);
  };

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
    if (teamData && !isTeamLoading) {
      const selectOptions = teamData.data.map(team => ({
        value: team.id,
        text: team.name,
      }));
      setTeams(selectOptions);
    }
  }, [teamData, isTeamLoading]);

  if (isTeamLoading) return <p>Loading...</p>;
  if (teamError) return <p>Error loading teams</p>;

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
                navigate(`/competitions/${comp.id}`);
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
