import React, { useEffect, useState } from 'react';

import DataTable from '@/components/table/DataTable';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './teamPage.scoped.css';
import EditDialog from './EditDialog';
import AddDialog from './AddDialog';
import ConfirmDialog from '@/components/dialog/Confirm';
import { listTeam } from '@/api/team';
import BasicTable from '@/components/table/BasicTable';
import { Box } from '@mui/system';
import { Pagination, Stack } from '@mui/material';

const headerSample = [
  { name: 'name', withImage: 'emblem', type: 'text' },
  { name: 'gender', type: 'text' },
  { name: 'teamType', type: 'text' },
  { name: 'managerName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'text' },
  { name: 'actions', type: 'button', isAction: true },
];

function createData(
  name: string,
  emblem: string,
  location: string,
  gender: Gender,
  teamType: string,
  managerName: string,
  phone: string,
  email: string,
  uniformTop: string,
  uniformBottom: string,
  uniformSocks: string,
) {
  return {
    name,
    emblem,
    location,
    gender,
    teamType,
    managerName,
    phone,
    email,
    uniformTop,
    uniformBottom,
    uniformSocks,
  };
}

const rows = [
  createData(
    'FS NNNN',
    '',
    '서울',
    'F',
    '성인부',
    '백주희',
    '01012345678',
    'fsnnnn1@gmail.com',
    'white',
    'black',
    'black',
  ),
  createData(
    'FS 하비',
    '',
    '서울',
    'F',
    '성인부',
    '김하비',
    '01000005678',
    'hobbyfs@gmail.com',
    'yellow',
    'green',
    'white',
  ),
  createData(
    'KING FC',
    '',
    '서울',
    'A',
    '성인부',
    '정약용',
    '01077777777',
    'kingfc@gmail.com',
    'blue',
    'white',
    'white',
  ),
  createData(
    'FC 부산',
    '',
    '부산',
    'M',
    '중등부',
    '박부산',
    '01012324228',
    'busanmiddle@gmail.com',
    'red',
    'red',
    'red',
  ),
  createData(
    '먼데 FC',
    '',
    '인천',
    'F',
    '성인부',
    '이먼데',
    '01098765432',
    'mondayfc@gmail.com',
    'white',
    'black',
    'black',
  ),
  createData(
    'FS 우르르',
    '',
    '안산',
    'F',
    '성인부',
    '우우리',
    '01031344500',
    'dnfmfm@gmail.com',
    'navy',
    'yellow',
    'yellow',
  ),
] as DialogData[];

/* TODO:FIXME:
  - 필터 컴포넌트 생성
*/

const deleteRow = async (row: DialogData) => {
  console.log(row);
  // Axios

  // data reload
};

const header = ['name', 'gender', 'location', 'emblem'];

export default function TeamPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<DialogData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [temaData, setTeamData] = useState<Team[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(10);

  useEffect(() => {
    getTeams(1);
  }, []);

  const getTeams = async (newPage: number) => {
    const response = await listTeam(newPage);
    const { page, last_page } = response.meta;
    setTeamData(response.data);
    setPage(Number(page));
    setPageCount(last_page);
  };

  return (
    <>
      <div className='page__container'>
        <div className='page__header'>
          <h4> Team </h4>
        </div>
        <div className='page__filter'>
          <p> 필터 영역 </p>
        </div>
        <Paper className='page__content' variant='outlined' square={false}>
          <div className='actions'>
            <Button variant='contained' onClick={() => setIsAddDialogOpen(true)}>
              추가
            </Button>
          </div>
          <DataTable
            header={headerSample}
            rows={rows}
            onClickModify={(row: DialogData) => {
              setSelectedRow(row);
              //FIXME: page 이동으로 바껴야 함.
              // modify Dialog Open
              setIsEditDialogOpen(true);
            }}
            onClickDelete={(row: DialogData) => {
              setSelectedRow(row);
              setIsDialogOpen(true);
            }}
          />
        </Paper>
        <Paper className='page__content' variant='outlined' square={false}>
          <Stack>
            <BasicTable
              header={header}
              rows={temaData}
              onClickModify={(row: DialogData) => {
                setSelectedRow(row);
                //FIXME: page 이동으로 바껴야 함.
                // modify Dialog Open
                setIsEditDialogOpen(true);
              }}
              onClickDelete={(row: DialogData) => {
                setSelectedRow(row);
                setIsDialogOpen(true);
              }}
            />
          </Stack>
          <Stack>
            <Box display='flex' padding={'24px'} justifyContent={'center'} alignContent={'center'}>
              <Pagination page={page} count={pageTotal} onChange={(_, newPage) => getTeams(newPage)} color='primary' />
            </Box>
          </Stack>
        </Paper>
      </div>
      <AddDialog
        open={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
        }}
        onConfirm={() => {
          // Axios
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
          if (selectedRow) deleteRow(selectedRow);
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
