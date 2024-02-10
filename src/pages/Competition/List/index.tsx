import CompetitionCard from '@/pageComponent/Competition/List/CompetitionCard';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

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
];

export default function CompetitionList() {
  let navigate = useNavigate();

  return (
    <Box display={'flex'}>
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
    </Box>
  );
}
