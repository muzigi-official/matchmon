import CompetitionCard from '@/pageComponent/Competition/List/CompetitionCard';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { listCompetition } from '@/api/competition';

function createData(
  id: string,
  name: string,
  address: string,
  poster: string,
  start_date: string,
  end_date: string,
  description: string,
  organizer: string,
): Competition {
  return {
    id,
    name,
    address,
    poster,
    start_date,
    end_date,
    description,
    organizer,
  };
}

const sampleCompetitionList: Competition[] = [
  createData(
    '1',
    '축구대회',
    '서울 상암 경기장',
    'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/PHVNVNTGTNGPPNRY5O567G67ZI.jpg',
    '2024-02-10',
    '2024-05-20',
    '서울 시청 주관 전반기 축구 대회',
    '서울 시청',
  ),
  createData(
    '2',
    '한강 풋살대회',
    '한강 풋살장',
    'https://www.hmfutsalpark.com/files/branch/branch_thumb_3.jpg',
    '2023-12-10',
    '2024-01-22',
    '구의 풋살협회주관 풋살 대회',
    '구의 풋살협회',
  ),
  createData(
    '3',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '4',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '5',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '6',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '7',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '8',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '9',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '10',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '11',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
  createData(
    '12',
    '북한산 풋살대회',
    '서울 상북구 경기장',
    'https://cdn.imweb.me/thumbnail/20220513/37add9cdb016b.png',
    '2023-10-10',
    '2023-12-20',
    '상북구 주민센터 주관 풋살 대회',
    '상북구 주민센터',
  ),
];

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
    setCompetitions(prev => [...prev, ...response.data]);
    setPage(Number(page));
    setPageCount(last_page);
    setIsFetching(false);
  };

  return (
    <Box display={'flex'} sx={{ flexWrap: 'wrap' }}>
      {sampleCompetitionList.map((competition, index) => {
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
