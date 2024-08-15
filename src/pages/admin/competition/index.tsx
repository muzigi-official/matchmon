import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { useCompetitionListQuery, useAddCompetitionMutation } from '@/hooks/queries/useCompetitionQuery';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
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
  const navigate = useNavigate();

  // React Query를 사용하여 대회 목록 가져오기
  const { data: competitionData, isLoading, error } = useCompetitionListQuery(page);
  const addCompetitionMutation = useAddCompetitionMutation();

  const competitions =
    competitionData?.data.map(competition => {
      return {
        ...competition,
        startDate: dayjs(competition.startDate).format('YYYY-MM-DD'),
      };
    }) || [];

  const pageTotal = competitionData?.meta?.last_page || 1;

  const clickModify = (competition: ICompetition) => {
    console.log('modify', competition);
  };

  const openDeleteConfirm = (competition: ICompetition) => {
    console.log('delete', competition);
  };

  const onSubmitHandler = (formData: ICompetitionFormInput) => {
    addCompetitionMutation.mutate(formData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const movePage = (row: ICompetition) => {
    navigate(`/admin/competitions/${row.id}`);
  };
  if (isLoading) return <Loading />;
  if (error) return <p>Error loading players</p>;

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
        <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => setPage(newPage)} />
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
