import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import CustomSelect from '@/components/common/Select/CustomSelect';

import * as S from './Index.style';

interface IInfoBoxProps {
  isLoading: boolean;
  infos: IMatchSettingParams[];
  onEdit: (setting: IMatchSettingParams) => void;
  onDelete: (id: number) => void;
}

const MatchInfoBox = ({ infos, isLoading, onEdit, onDelete }: IInfoBoxProps) => {
  const [selectedStage, setSelectedStage] = useState<string | number>(infos[0]?.id || '');

  const options = infos.map(setting => ({
    value: setting.id ?? '',
    text: setting.stage,
  }));

  const handleSelectChange = (value: string | number | undefined) => {
    setSelectedStage(value || '');
  };

  const selectedInfo = infos.find(setting => setting.id === selectedStage);

  useEffect(() => {
    if (infos.length > 0) {
      setSelectedStage(infos[0].id ?? '');
    }
  }, [infos]);

  return (
    <S.MatchInfoContainer>
      <S.SelectWrapper>
        <CustomSelect options={options} label='단계 선택' defaultValue={selectedStage} onSelect={handleSelectChange} />
      </S.SelectWrapper>
      {selectedInfo && (
        <S.MatchInfo>
          {isLoading ? (
            <S.Spinner />
          ) : (
            <S.InfoText>
              <S.Highlight>{selectedInfo.id}</S.Highlight> | 구장 수:{' '}
              <S.Highlight>{selectedInfo.stadiumCount || '2'}</S.Highlight>개 | 경기 시간(분):{' '}
              <S.Highlight>{selectedInfo.matchDuration || '15'}</S.Highlight>분 | 경기 구분:{' '}
              <S.Highlight>{selectedInfo.hasHalves ? '전.후반' : '단판'}</S.Highlight>
              <IconButton aria-label='edit' onClick={() => onEdit(selectedInfo)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label='delete'
                onClick={() => selectedInfo.id !== undefined && onDelete(selectedInfo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </S.InfoText>
          )}
        </S.MatchInfo>
      )}
    </S.MatchInfoContainer>
  );
};

export default MatchInfoBox;
