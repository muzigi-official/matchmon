import { useEffect, useState } from 'react';

import CustomSelect from '@/components/common/Select/CustomSelect';

import * as S from './Index.style';

interface IInfoBoxProps {
  isLoading: boolean;
  infos: IMatchSetting[];
}

const MatchInfoBox = ({ infos, isLoading }: IInfoBoxProps) => {
  const [selectedStage, setSelectedStage] = useState<string | number>(infos[0]?.stage || '');

  const options = infos.map(setting => ({
    value: setting.stage,
    text: setting.stage,
  }));

  const handleSelectChange = (value: string | number | undefined) => {
    setSelectedStage(value || '');
  };

  const selectedInfo = infos.find(setting => setting.stage === selectedStage);

  useEffect(() => {
    if (infos.length > 0) {
      setSelectedStage(infos[0].stage);
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
              구장 수: <S.Highlight>{selectedInfo.stadiumCount || '2'}</S.Highlight>개 | 경기 시간(분):{' '}
              <S.Highlight>{selectedInfo.matchDuration || '15'}</S.Highlight>분 | 경기 구분:{' '}
              <S.Highlight>{selectedInfo.hasHalves ? '전.후반' : '단판'}</S.Highlight>
            </S.InfoText>
          )}
        </S.MatchInfo>
      )}
    </S.MatchInfoContainer>
  );
};

export default MatchInfoBox;
