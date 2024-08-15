import { useState } from 'react';

import { Stack } from '@mui/material';
import DataTable from '@/components/mui/table/DataTable';

import Button from '@/components/common/Button';
import ConfirmDialog from '@/components/common/dialog/Confirm';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import {
  useTeamListQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useRemoveTeamMutation,
} from '@/hooks/queries/useTeamQuery';
import TeamDialog from '@/pages/admin/teams/DialogAddTeam';

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
  const [page, setPage] = useState<number>(1);

  const { data: teamListResponse, isLoading, error } = useTeamListQuery(page, PAGE_SIZE);

  const teamData = teamListResponse?.data || [];
  const pageTotal = teamListResponse?.meta.last_page || 1;

  const addTeamMutation = useAddTeamMutation(setPage);
  const editTeamMutation = useEditTeamMutation(page);
  const removeTeamMutation = useRemoveTeamMutation(page, setPage);

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
    addTeamMutation.mutate(formData, {
      onSuccess: () => {
        setIsTeamDialogOpen(false);
      },
    });
  };

  const handleUpdateTeam = async (formData: ITeamFormInput) => {
    if (selectedRow) {
      editTeamMutation.mutate(
        { ...formData, teamId: selectedRow.id },
        {
          onSuccess: () => {
            setIsTeamDialogOpen(false);
          },
        },
      );
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

  const deleteRow = async (row: ITeam) => {
    if (row.id) {
      removeTeamMutation.mutate(row.id);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading teams</p>;

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
              rows={teamData}
              onClickModify={(row: ITeam) => clickModify(row)}
              onClickDelete={(row: ITeam) => openDeleteConfirm(row)}
            />
          </Stack>
          <Stack>
            <S.FooterContainer>
              <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => setPage(newPage)} />
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
          if (selectedRow) deleteRow(selectedRow);
          setIsComfirmOpen(false);
        }}
      />
    </>
  );
}
