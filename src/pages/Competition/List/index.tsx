import CompetitionCard from '@/pageComponent/Competition/List/Card';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { listCompetition } from '@/api/competition';

export default function CompetitionList() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const hasNextPage = useMemo(() => {
    return page < pageTotal;
  }, [page, pageTotal]);

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) getNextPage();
    });
  };

  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);

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
    console.log(response.data);
    setCompetitions(response.data);
    setPage(Number(page));
    setPageCount(last_page);
    setIsFetching(false);
  };

  return (
    <Box display={'flex'} sx={{ flexWrap: 'wrap' }}>
      {competitions.map((competition, index) => {
        return (
          <CompetitionCard
            key={`${competition.name}_${index}`}
            competition={competition}
            onClick={comp => {
              navigate(`/competition/${comp.id}`);
            }}
          />
        );
      })}
      <div className='Target' ref={ref}></div>
    </Box>
  );
}
