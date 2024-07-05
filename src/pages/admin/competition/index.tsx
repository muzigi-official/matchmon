import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { addCompetition, listCompetition } from '@/api/competition';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import DataTable from '@/components/mui/table/DataTable';
import AddDialog from '@/pages/admin/competition/dialog/AddCompetition';

import * as S from './Index.style';

const competitionHeader = [
  { headerName: '대회이름', property: 'name', withImage: 'poster', type: 'text' },
  { headerName: '주소', property: 'address', type: 'text' },
  { headerName: '날짜', property: 'startDate', type: 'text' },
  { headerName: '주최자', property: 'organizer', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function AdminCompetition() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const navigate = useNavigate();

  const getList = async (newPage: number) => {
    const response = await listCompetition(newPage);
    const { page, last_page } = response.meta;

    const competitions = response.data.map(competition => {
      return {
        ...competition,
        startDate: dayjs(competition.startDate).format('YYYY-MM-DD'),
      };
    });

    setCompetitions(competitions);
    setPage(Number(page));
    setPageCount(last_page);
  };

  const clickModify = (competition: ICompetition) => {
    console.log('modify', competition);
  };

  const openDeleteConfirm = (competition: ICompetition) => {
    console.log('delete', competition);
  };

  const onSubmitHandler = async (formData: ICompetitionFormInput) => {
    const { statusText } = await addCompetition(formData);
    if (statusText === 'Created') {
      alert('대회 등록 성공');
      setDialogOpen(false);
    }
  };

  const movePage = (row: ICompetition) => {
    navigate(`/admin/competitions/${row.id}`);
  };

  useEffect(() => {
    getList(page);
  }, []);

  return (
    <S.Container>
      <S.Top>
        <h2>전체 대회 리스트</h2>
        <Button variant='contained' onClick={() => setDialogOpen(true)}>
          대회 생성
        </Button>
      </S.Top>
      <S.Content>
        <DataTable
          header={competitionHeader}
          rows={competitions}
          onClickRow={(row: ICompetition) => {
            movePage(row);
          }}
          onClickModify={(row: ICompetition) => clickModify(row)}
          onClickDelete={(row: ICompetition) => openDeleteConfirm(row)}
        />
        <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => getList(newPage)} />
      </S.Content>
      <AddDialog
        open={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        onConfirm={onSubmitHandler}
      />
    </S.Container>
  );
}
