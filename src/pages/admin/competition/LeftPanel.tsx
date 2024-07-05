import Button from '@/components/common/Button';
import { getCompetitionStatus } from '@/utils/date';

import {
  NameContainer,
  Name,
  StatusBadge,
  Info,
  Details,
  DetailTitle,
  DetailItem,
  ButtonContainer,
} from './PageDetails.styles.ts';

interface IPanelProps {
  info: ICompetition | null;
  onClick?: () => void;
}

const LeftPanel = ({ info, onClick }: IPanelProps) => {
  const status = info ? getCompetitionStatus(info.startDate, info.endDate) : '';
  const competition = info
    ? info
    : {
        name: '',
        status,
        startDate: '',
        endDate: '',
        address: '',
        organizer: '-',
        phoneNumber: '-',
      };
  return (
    <>
      <NameContainer>
        <Name>{competition.name}</Name>
        <StatusBadge status={status}>{status}</StatusBadge>
      </NameContainer>
      <Info>
        {competition.startDate === competition.endDate
          ? `${competition.startDate}`
          : `${competition.startDate} ~ ${competition.endDate}`}
      </Info>
      <Info>{competition.address}</Info>

      <Details>
        <DetailTitle>Details</DetailTitle>
        <DetailItem>
          <span>담당자:</span> 관리자
        </DetailItem>
        <DetailItem>
          <span>주최사:</span> {competition.organizer}
        </DetailItem>
        <DetailItem>
          <span>Contact:</span> {competition.phoneNumber}
        </DetailItem>
      </Details>

      <ButtonContainer>
        <Button color='primary' onClick={onClick}>
          Edit
        </Button>
      </ButtonContainer>
    </>
  );
};

export default LeftPanel;
