import Tabs from '@/components/common/Tabs';

import * as S from './Index.style';

interface IInfoBoxProps {
  isLoading: boolean;
  infos: IMatchSetting[];
}

const MatchInfoBox = ({ infos, isLoading }: IInfoBoxProps) => {
  const tabs = infos.map(setting => ({
    label: setting.stage,
    content: (
      <S.MatchInfo>
        {isLoading ? (
          <S.Spinner />
        ) : (
          <S.InfoText>
            구장 수: <S.Highlight>{setting?.stadiumCount || '2'}</S.Highlight>개 | 경기 시간(분):{' '}
            <S.Highlight>{setting?.matchDuration || '15'}</S.Highlight>분 | 경기 구분:{' '}
            <S.Highlight>{setting?.hasHalves ? '전.후반' : '단판'}</S.Highlight>
          </S.InfoText>
        )}
      </S.MatchInfo>
    ),
  }));
  return <Tabs tabs={tabs} />;
};

export default MatchInfoBox;
