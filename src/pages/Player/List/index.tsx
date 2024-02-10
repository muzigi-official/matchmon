import { useState, useEffect } from 'react';

import { Stack, Box, Pagination } from '@mui/material';
import BasicTable from '@/components/table/BasicTable';
import BasicSelect from '@/components/select/BasicSelect';
import ConfirmDialog from '@/components/dialog/Confirm';
import EditDialog from '@/pageComponent/Player/List/EditDialog';
import { listPlayer, removePlayer, editPlayer } from '@/api/player';

const tableHeader = ['name', 'gender', 'birth'];

const filterTitle = '나이';
const filterItems = [
  { value: '0', name: '10세 미만' },
  { value: '10', name: '10대' },
  { value: '20', name: '20대' },
  { value: '30', name: '30대' },
  { value: '40', name: '40대' },
  { value: '50', name: '50대' },
  { value: '60', name: '60세 이상' },
];

export default function PlayerList() {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [filterOption, setFilterOption] = useState({ age: '10' });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Player | null>(null);
  const [players, setPlayer] = useState<Player[]>([]);

  useEffect(() => {
    getList(page);
  }, []);

  const getList = async (newPage: number) => {
    // console.log(newPage, pageSize, filterOption);

    const response = await listPlayer(newPage);
    const { page, last_page } = response.meta;
    setPlayer(response.data);
    setPage(Number(page));
    setPageCount(last_page);
  };

  const changeFilterOption = (key: string, value: string) => {
    setFilterOption(prev => {
      return { ...prev, [key]: value };
    });
  };
  const handleChangePlayer = async (editedPlayer: Player) => {
    const { id, ...editData } = editedPlayer;
    await editPlayer(id, editData);
  };

  const deleteRow = async (row: Player) => {
    await removePlayer(row.id);
    await getList(page);
  };

  return (
    <>
      <Box alignContent='center' paddingX='15px'>
        <Stack>
          <h1>Player</h1>
        </Stack>
        <Stack>
          <Box display='flex' padding={'24px'} justifyContent={'start'} alignContent={'center'}>
            <BasicSelect
              title={filterTitle}
              items={filterItems}
              onSelect={value => {
                changeFilterOption('age', value);
              }}
            ></BasicSelect>
          </Box>
        </Stack>
        <Stack>
          <BasicTable
            header={tableHeader}
            rows={players}
            onClickDelete={(row: Player) => {
              setSelectedRow(row);
              setIsDialogOpen(true);
            }}
            onClickModify={(row: Player) => {
              setSelectedRow(row);
              setIsEditDialogOpen(true);
            }}
          />
        </Stack>
        <Stack>
          <Box display='flex' padding={'24px'} justifyContent={'center'} alignContent={'center'}>
            <Pagination page={page} count={pageTotal} onChange={(_, newPage) => getList(newPage)} color='primary' />
          </Box>
        </Stack>
      </Box>
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
      {!!selectedRow && (
        <EditDialog
          key={selectedRow.id}
          player={selectedRow}
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
          }}
          onConfirm={async (editedPlayer: Player) => {
            await handleChangePlayer(editedPlayer);
            setIsEditDialogOpen(false);
            await getList(1);
          }}
        />
      )}
    </>
  );
}
