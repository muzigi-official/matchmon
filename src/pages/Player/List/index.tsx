import { useState, useEffect } from 'react';

import { listPlayer, removePlayer, addPlayer, editPlayer } from '@/api/player';

import { Pagination } from '@mui/material';
import DataTable from '@/components/table/DataTable';
import ConfirmDialog from '@/components/dialog/Confirm';
import PlayerDialog from '@/pageComponent/Player/List/PlayerDialog';
import MyButton from '@/components/button/MyButton';

import * as S from '@/pages/Container.style';

const tableHeader = [
  { headerName: '이름', property: 'nickName', withImage: 'pictrue', type: 'text' },
  // { headerName: '성별', property: 'gender', withImage: 'pictrue', type: 'text' },
  // { headerName: '등번호', property: 'uniformNumber', type: 'text' },
  // { headerName: '팀 ID', property: 'teamId', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function PlayerList() {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(pageSize);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Player | null>(null);
  const [players, setPlayer] = useState<Player[]>([]);

  useEffect(() => {
    getList(page);
  }, []);

  const getList = async (newPage: number) => {
    const response = await listPlayer(newPage);
    const { page, last_page } = response.meta;
    setPlayer(response.data);
    setPage(Number(page));
    setPageCount(last_page);
  };

  const onClickAddButton = () => {
    setSelectedRow(null);
    setIsFormDialogOpen(true);
  };

  const onSubmitHandler = async (formData: Player) => {
    console.log(formData);
    if (selectedRow === null) {
      handleAddPlayer(formData);
    } else {
      await handleChangePlayer(formData);
    }
    setIsFormDialogOpen(false);
    await getList(1);
  };

  const handleAddPlayer = async (formData: Player) => {
    console.log('Confirm add player', formData);
    // await addPlayer(formData);
  };

  const handleChangePlayer = async (formData: Player) => {
    console.log('Confirm edit player', formData);
    const { id, ...editForm } = formData;
    // if (id) await editPlayer(id, editForm);
  };

  const deleteRow = async (row: Player) => {
    if (row.id) await removePlayer(row.id);
    await getList(page);
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h4> Admin: 모든 선수 </h4>
          <MyButton variant='contained' onClick={onClickAddButton}>
            팀 추가
          </MyButton>
        </S.Top>
        <S.Filter>Filter Options 나중에 넣기</S.Filter>
        <S.Content>
          <DataTable
            header={tableHeader}
            rows={players}
            onClickDelete={(row: Player) => {
              setSelectedRow(row);
              setIsDialogOpen(true);
            }}
            onClickModify={(row: Player) => {
              setSelectedRow(row);
              setIsFormDialogOpen(true);
            }}
          />
        </S.Content>
        <S.FooterContainer>
          <Pagination page={page} count={pageTotal} onChange={(_, newPage) => getList(newPage)} color='primary' />
        </S.FooterContainer>
      </S.Container>
      {/* <AddDialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
        }}
      /> */}
      <ConfirmDialog
        title='삭제'
        content='삭제하시겠습니까'
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onConfirm={() => {
          if (selectedRow) deleteRow(selectedRow);
          setIsDialogOpen(false);
        }}
      />
      <PlayerDialog
        key={selectedRow && selectedRow.id}
        player={selectedRow}
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
        }}
        onConfirm={onSubmitHandler}
      />
      {!!selectedRow && ''}
    </>
  );
}
