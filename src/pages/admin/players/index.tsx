import { useState, useEffect } from 'react';

import { listPlayer, removePlayer, addPlayer, editPlayer } from '@/api/player';
import { listTeam } from '@/api/team';

import Pagination from '@/components/common/Pagination';
import DataTable from '@/components/table/DataTable';
import ConfirmDialog from '@/components/common/dialog/Confirm';
import PlayerDialog from '@/pageComponent/Player/PlayerDialog';
import Button from '@/components/common/Button';

import * as S from './Container.style';

const tableHeader = [
  { headerName: '이름', property: 'nickName', withImage: 'pictrue', type: 'text' },
  { headerName: '등번호', property: 'uniformNumber', type: 'text' },
  { headerName: '팀 이름', property: 'teamName', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function PlayerList() {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageCount] = useState<number>(pageSize);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IParsePlayer | null>(null);
  const [players, setPlayer] = useState<IParsePlayer[]>([]);
  const [options, setOptions] = useState<ISelectProperty[]>([{ value: '', text: '팀 선택' }]);

  useEffect(() => {
    getList(page);
  }, []);

  useEffect(() => {
    getTeams(page);
  }, []);

  const getList = async (newPage: number) => {
    const response = await listPlayer(newPage);
    const { page, last_page } = response.meta;
    const IParsePlayer = response.data.map(player => {
      return {
        id: player.id ? player.id : 0,
        uniformNumber: player.uniformNumber ? player.uniformNumber : 0,
        role: player.role,
        nickName: player.nickName,
        picture: player.picture ? player.picture : '',
        teamName: player.team ? player.team.name : '',
        teamId: player.team ? player.team.id : '',
      };
    });
    setPlayer(IParsePlayer);
    setPage(Number(page));
    setPageCount(last_page);
  };

  const getTeams = async (newPage: number) => {
    const response = await listTeam(newPage, 100);
    const selectOptions = response.data.map(team => {
      return {
        value: team.id,
        text: team.name,
      };
    });
    setOptions(selectOptions);
  };

  const onClickAddButton = () => {
    setSelectedRow(null);
    setIsFormDialogOpen(true);
  };

  const onSubmitHandler = async (formData: IPlayerFormInput) => {
    if (selectedRow === null) {
      handleAddPlayer(formData);
    } else {
      await handleChangePlayer(formData);
    }
    setIsFormDialogOpen(false);
    await getList(1);
  };

  const handleAddPlayer = async (formData: IPlayerFormInput) => {
    const { uniformNumber, teamId } = formData;
    const { statusText } = await addPlayer({
      ...formData,
      uniformNumber: uniformNumber ? Number(uniformNumber) : 0,
      teamId: Number(teamId),
    });
    if (statusText === 'Created') {
      alert('선수 등록 성공');
      setIsDialogOpen(false);
      setSelectedRow(null);
    }
  };

  const handleChangePlayer = async (formData: IPlayerFormInput) => {
    const { id, nickName, picture } = formData;
    if (id) {
      const { statusText } = await editPlayer(id, {
        nickName: nickName,
        role: formData.role ? formData.role : 0,
        picture: picture,
        uniformNumber: formData.uniformNumber ? Number(formData.uniformNumber) : 0,
      });

      if (statusText === 'OK') {
        alert('선수 수정 성공');
        setIsDialogOpen(false);
        setSelectedRow(null);
      }
    }
  };

  const deleteRow = async (row: IPlayer) => {
    if (row.id) {
      const response = await removePlayer(row.id);
      console.log(response);
    }
  };

  return (
    <>
      <S.Container>
        <S.Top>
          <h4> Admin: 모든 선수 </h4>
          <Button variant='contained' onClick={onClickAddButton}>
            선수 추가
          </Button>
        </S.Top>
        <S.Filter>Filter Options 나중에 넣기</S.Filter>
        <S.Content>
          <DataTable
            header={tableHeader}
            rows={players}
            onClickDelete={(row: IParsePlayer) => {
              setSelectedRow(row);
              setIsDialogOpen(true);
            }}
            onClickModify={(row: IParsePlayer) => {
              setSelectedRow(row);
              setIsFormDialogOpen(true);
            }}
          />
        </S.Content>
        <S.FooterContainer>
          <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => getList(newPage)} />
        </S.FooterContainer>
      </S.Container>
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
        player={selectedRow}
        teams={options}
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
        }}
        onConfirm={onSubmitHandler}
      />
    </>
  );
}
