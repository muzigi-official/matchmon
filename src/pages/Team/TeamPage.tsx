import { useEffect, useState } from 'react';

import { Pagination, Stack } from '@mui/material';
import DataTable from '@/components/table/DataTable';
import ConfirmDialog from '@/components/dialog/Confirm';
import MyButton from '@/components/button/MyButton';
import TeamDialog from '@/pageComponent/team/TeamDialog';

import { listTeam, addTeam, editTeam } from '@/api/team';

import * as S from './Container.style';

const teamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '성별', property: 'gender', type: 'text' },
  { headerName: '지역', property: 'location', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function TeamPage() {
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState<boolean>(false);
  const [isComfirmOpen, setIsComfirmOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);

  // TODO: 팀 추가 성공이 닫히면 자연스럽게 새로고침 하고 싶음.
  useEffect(() => {
    getTeams(page);
  }, []);

  const getTeams = async (newPage: number) => {
    const response = await listTeam(newPage, 10);
    const { last_page } = response.meta;
    setTeams(response.data);
    setPage(Number(newPage));
    setPageCount(last_page);
  };

  const onClickAddButton = () => {
    setSelectedRow(null);
    setIsTeamDialogOpen(true);
  };

  const onSubmitHandler = async (formData: TeamFormInput) => {
    if (selectedRow === null) {
      handleAddTeam(formData);
    } else {
      await handleUpdateTeam(formData);
    }
    setIsTeamDialogOpen(false);
  };

  const handleAddTeam = async (formData: TeamFormInput) => {
    const { statusText } = await addTeam(formData);

    if (statusText === 'Created') {
      alert('팀 추가 성공');
      setIsTeamDialogOpen(false);
      getTeams(page);
    }
  };

  const handleUpdateTeam = async (formData: TeamFormInput) => {
    if (selectedRow) {
      const response = await editTeam({ ...formData, teamId: selectedRow.id });
      if (response) {
        alert('팀 수정 성공');
        setIsTeamDialogOpen(false);
        getTeams(page);
      }
    }
  };

  const clickModify = (row: Team) => {
    setSelectedRow(row);
    setIsTeamDialogOpen(true);
  };

  const openDeleteConfirm = (row: Team) => {
    setSelectedRow(row);
    setIsComfirmOpen(true);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h4> Admin: 모든 팀 </h4>
          <MyButton variant='contained' onClick={onClickAddButton}>
            팀 추가
          </MyButton>
        </S.Top>
        <S.Filter>
          <p> 필터 영역 추후 개발 </p>
        </S.Filter>
        <S.Content>
          <Stack>
            <DataTable
              header={teamHeader}
              rows={teams}
              onClickModify={(row: Team) => clickModify(row)}
              onClickDelete={(row: Team) => openDeleteConfirm(row)}
            />
          </Stack>
          <Stack>
            <S.FooterContainer>
              <Pagination page={page} count={pageTotal} onChange={(_, newPage) => getTeams(newPage)} color='primary' />
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
