import BasicSelect from '@/components/common/Select/BasicSelect';

import * as S from './Container.style';

const matchSelect = [
  { value: '1', text: '1경기 10:00 ~ 10:15 눈누난나A vs 눈누난나B' },
  { value: '2', text: '2경기 10:20 ~ 10:35 양구시청 vs 장도리 FC' },
  { value: '3', text: '3경기 10:40 ~ 10:55 hobby FC vs 프라임 FC' },
  { value: '4', text: '4경기 11:00 ~ 11:15 눈누난나B vs 프라임 FC' },
  { value: '5', text: '5경기 11:20 ~ 10:35 장도리 FC vs 눈누난나A' },
  { value: '6', text: '6경기 11:40 ~ 11:55 룰루랄라 vs Hobby FC' },
];

// interface HeaderProperty {
//   order: number;
//   dateTime: string;
//   teams: string;
//   result: string;
//   gameState: string;
// }

export default function AdminMatchDetail() {
  const handleSelect = (option: ISelectProperty) => {
    console.log('select', option.value);
  };

  // const hadleClickRow = (row: HeaderProperty) => {
  //   console.log('click', row);
  // };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 기록</h3>
      </S.Top>
      <S.Content>
        <S.Header>
          <h5>2024.04.20</h5>
          <h5>B 구장</h5>
        </S.Header>
        <S.List>{}</S.List>
        <BasicSelect label='경기' name='match' options={matchSelect} onSelect={handleSelect}></BasicSelect>
      </S.Content>
    </S.Container>
  );
}
