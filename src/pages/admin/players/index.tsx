import { useState, useEffect } from 'react';

import {
  usePlayerListQuery,
  useRemovePlayerMutation,
  useAddPlayerMutation,
  useEditPlayerMutation,
} from '@/hooks/queries/usePlayerQuery';

import { listTeam } from '@/api/team';

import Pagination from '@/components/common/Pagination';
import DataTable from '@/components/mui/table/DataTable';
import ConfirmDialog from '@/components/common/dialog/Confirm';
import Button from '@/components/common/Button';
import DialogParticipate from '@/pages/admin/players/DialogAddPlayer';

import * as S from './Container.style';

const tableHeader = [
  { headerName: '이름', property: 'nickName', withImage: 'pictrue', type: 'text' },
  { headerName: '등번호', property: 'uniformNumber', type: 'text' },
  { headerName: '팀 이름', property: 'teamName', type: 'text' },
  { headerName: '', property: 'actions', type: 'button', isAction: true },
];

export default function PlayerList() {
  const [page, setPage] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IParsePlayer | null>(null);
  const [options, setOptions] = useState<ISelectProperty[]>([{ value: '', text: '팀 선택' }]);

  // React Query를 사용하여 플레이어 목록 가져오기
  const { data } = usePlayerListQuery(page);

  console.log('player data', data);

  // 데이터를 파싱하여 필요한 형태로 변환
  const players =
    data?.data.map(player => {
      return {
        id: player.id ?? 0,
        uniformNumber: player.uniformNumber ?? 0,
        role: player.role,
        nickName: player.nickName,
        picture: player.picture ?? '',
        teamName: player.team?.name ?? '',
        teamId: player.team?.id ?? '',
      };
    }) || [];
  const pageTotal = data?.meta.last_page || 1;

  // React Query를 사용하여 플레이어 추가, 수정, 삭제
  const addPlayerMutation = useAddPlayerMutation();
  const editPlayerMutation = useEditPlayerMutation();
  const removePlayerMutation = useRemovePlayerMutation();

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

  // 플레이어 추가 핸들러
  const handleAddPlayer = async (formData: IPlayerFormInput) => {
    // teamId를 number로 변환
    if (formData.teamId === undefined) {
      console.error('Team ID is required.');
      return;
    }

    const playerData: ICreatePlayerDto = {
      nickName: formData.nickName,
      picture: formData.picture,
      uniformNumber: formData.uniformNumber ?? null,
      teamId: Number(formData.teamId), // teamId를 number로 변환
    };

    addPlayerMutation.mutate(playerData, {
      onSuccess: () => {
        alert('선수 등록 성공');
        setIsDialogOpen(false);
        setSelectedRow(null);
      },
      onError: () => {
        alert('선수 등록 실패');
      },
    });
  };

  // 플레이어 수정 핸들러
  const handleChangePlayer = async (formData: IPlayerFormInput) => {
    if (!selectedRow?.id) {
      console.error('No player selected for update.');
      return;
    }

    const { nickName, picture, uniformNumber, role } = formData;

    const updateData: IUpdatePlayerDto = {
      id: selectedRow.id,
      nickName,
      picture,
      uniformNumber: uniformNumber ?? null,
      role: role ?? 0, // 0으로 기본값 설정
    };

    editPlayerMutation.mutate(updateData, {
      onSuccess: () => {
        alert('선수 수정 성공');
        setIsDialogOpen(false);
        setSelectedRow(null);
      },
      onError: () => {
        alert('선수 수정 실패');
      },
    });
  };

  // 플레이어 삭제 핸들러
  const deleteRow = async (row: IParsePlayer) => {
    if (row.id) {
      removePlayerMutation.mutate(row.id, {
        onSuccess: () => {
          alert('선수 삭제 성공');
        },
        onError: () => {
          alert('선수 삭제 실패');
        },
      });
    }
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
  };

  useEffect(() => {
    getTeams(page);
  }, []);

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
          <Pagination currentPage={page} totalPage={pageTotal} onPageChange={newPage => setPage(newPage)} />
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
      <DialogParticipate
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
