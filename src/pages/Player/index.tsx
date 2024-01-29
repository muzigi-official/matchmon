import { useState, useEffect } from 'react';

import { Stack, Box, Pagination } from '@mui/material';
import BasicTable from 'src/components/table/BasicTable';
import BasicSelect from 'src/components/select/BasicSelect';
import ConfirmDialog from 'src/components/dialog/Confirm';
import EditDialog from 'src/pageComponent/Player/EditDialog';

const headerSample = ['이름', '선출여부', '성별', '연령대', '프사', '대표팀'];
const tableHeader = ['이름', '선출여부', '성별', '연령대', '대표팀'];

const makeRow = (이름: string, 선출여부: string, 성별: string, 연령대: string, 프사: string, 대표팀: string) => {
  return { 이름, 선출여부, 성별, 연령대, 프사, 대표팀 };
};
const rowsSample = [
  {
    이름: 'nameA',
    선출여부: 'X',
    성별: 'M',
    연령대: '20',
    프사: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt',
    대표팀: 'FC',
  },
  makeRow('nameB', 'O', 'F', '30', '', 'FC'),
  makeRow('nameC', 'O', 'F', '30', '', 'FC'),
  makeRow('nameD', 'O', 'F', '30', '', 'FC'),
];

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

export default function Player() {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);
  const [filterOption, setFilterOption] = useState({ age: '10' });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<PlayerData | null>(null);

  useEffect(() => {
    getList(page);
  }, []);

  const getList = async (newPage: number) => {
    console.log(newPage, pageSize, filterOption);
    // Axios
    setPage(newPage);
    setPageCount(10);
  };

  const changeFilterOption = (key: string, value: string) => {
    setFilterOption(prev => {
      return { ...prev, [key]: value };
    });
  };

  const deleteRow = async (row: PlayerData) => {
    console.log(row);
    // Axios

    // data reload
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
            rows={rowsSample}
            onClickDelete={(row: PlayerData) => {
              setSelectedRow(row);
              setIsDialogOpen(true);
            }}
            onClickModify={(row: PlayerData) => {
              setSelectedRow(row);
              // modify Dialog Open
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
          player={selectedRow}
          open={isEditDialogOpen}
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
