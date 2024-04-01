import React, { useEffect, useState } from 'react';

import { listTeam } from '@/api/team';

import { Pagination, Stack } from '@mui/material';
import DataTable from '@/components/table/DataTable';
import ConfirmDialog from '@/components/dialog/Confirm';
import MyButton from '@/components/button/MyButton';
import AddDialog from '@/pageComponent/team/AddDialog';
import EditDialog from './EditDialog';

import * as S from './Container.style';

const teamHeader = [
  { headerName: '팀이름', property: 'name', withImage: 'emblem', type: 'text' },
  { headerName: '성별', property: 'gender', type: 'text' },
  { headerName: '지역', property: 'location', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function TeamPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Team | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [temaData, setTeamData] = useState<Team[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);

  // TODO: 팀 추가 성공이 닫히면 자연스럽게 새로고침 하고 싶음.
  useEffect(() => {
    if (!isAddDialogOpen) {
      getTeams(page);
    }
  }, [isAddDialogOpen]);

  const getTeams = async (newPage: number) => {
    const response = await listTeam(newPage);
    const { last_page } = response.meta;
    setTeamData(response.data);
    setPage(Number(newPage));
    setPageCount(last_page);
  };

  const openModifyDialog = (row: Team) => {
    console.log('click modify', row);
    setSelectedRow(row);
    setIsEditDialogOpen(true);
  };

  const openDeleteConfirm = (row: Team) => {
    console.log('click delete button');
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h4> Admin: 모든 팀 </h4>
          <MyButton variant='contained' onClick={() => setIsAddDialogOpen(true)}>
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
              rows={temaData}
              onClickModify={openModifyDialog}
              onClickDelete={openDeleteConfirm}
            />
          </Stack>
          <Stack>
            <S.FooterContainer>
              <Pagination page={page} count={pageTotal} onChange={(_, newPage) => getTeams(newPage)} color='primary' />
            </S.FooterContainer>
          </Stack>
        </S.Content>
      </S.Container>
      <AddDialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
        }}
      />
      <ConfirmDialog
        title='삭제'
        content='삭제하시겠습니까'
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onConfirm={() => {
          setIsDialogOpen(false);
        }}
      />
      {!!selectedRow && (
        <EditDialog
          open={isEditDialogOpen}
          data={selectedRow}
          onClose={() => {
            setIsEditDialogOpen(false);
          }}
          onConfirm={() => {
            // Axios
            setIsEditDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
