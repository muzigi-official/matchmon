import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import Pagination from '@/components/common/Pagination';
import DataTable from '@/components/mui/table/DataTable';
import ConfirmDialog from '@/components/common/dialog/Confirm';
import Button from '@/components/common/Button';
import TeamDialog from '@/pageComponent/team/TeamDialog';

import { listTeam, addTeam, editTeam } from '@/api/team';

import * as S from './Container.style';

const teamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '성별', property: 'gender', type: 'text' },
  { headerName: '지역', property: 'location', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

const PAGE_SIZE = 10;

export default function TeamPage() {
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState<boolean>(false);
  const [isComfirmOpen, setIsComfirmOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ITeam | null>(null);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    getTeams(page);
  }, []);

  const getTeams = async (newPage: number) => {
    const response = await listTeam(newPage, PAGE_SIZE);
    const { page, last_page } = response.meta;
    setTeams(response.data);
    setPage(Number(page));
    setPageCount(last_page);
  };

  const onClickAddButton = () => {
    setSelectedRow(null);
    setIsTeamDialogOpen(true);
  };

  const onSubmitHandler = async (formData: ITeamFormInput) => {
    if (selectedRow === null) {
      handleAddTeam(formData);
    } else {
      await handleUpdateTeam(formData);
    }
    setIsTeamDialogOpen(false);
  };

  const handleAddTeam = async (formData: ITeamFormInput) => {
    const { statusText } = await addTeam(formData);

    if (statusText === 'Created') {
      alert('팀 추가 성공');
      setIsTeamDialogOpen(false);
      getTeams(page);
    }
  };

  const handleUpdateTeam = async (formData: ITeamFormInput) => {
    if (selectedRow) {
      const response = await editTeam({ ...formData, teamId: selectedRow.id });
      if (response) {
        alert('팀 수정 성공');
        setIsTeamDialogOpen(false);
        getTeams(page);
      }
    }
  };

  const clickModify = (row: ITeam) => {
    setSelectedRow(row);
    setIsTeamDialogOpen(true);
  };

  const openDeleteConfirm = (row: ITeam) => {
    setSelectedRow(row);
    setIsComfirmOpen(true);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h4> Admin: 모든 팀 </h4>
          <Button variant='contained' onClick={onClickAddButton}>
            팀 추가
          </Button>
        </S.Top>
        <S.Filter>
          <p> 필터 영역 추후 개발 </p>
        </S.Filter>
        <S.Content>
          <Stack>
            <DataTable
              header={teamHeader}
              rows={teams}
              onClickModify={(row: ITeam) => clickModify(row)}
              onClickDelete={(row: ITeam) => openDeleteConfirm(row)}
            />
          </Stack>
          <Stack>
            <S.FooterContainer>
              <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => getTeams(newPage)} />
            </S.FooterContainer>
          </Stack>
        </S.Content>
      </S.Container>
      <TeamDialog
        team={selectedRow}
        open={isTeamDialogOpen}
        onConfirm={onSubmitHandler}
        onClose={() => {
          setIsTeamDialogOpen(false);
        }}
      />
      <ConfirmDialog
        title='삭제'
        content='삭제하시겠습니까'
        open={isComfirmOpen}
        onClose={() => {
          setIsComfirmOpen(false);
        }}
        onConfirm={() => {
          setIsComfirmOpen(false);
        }}
      />
    </>
  );
}
