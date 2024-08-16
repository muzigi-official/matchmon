import dayjs from 'dayjs';

export function diffDate(start: string | Date, end: string | Date) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  return endDate.diff(startDate, 'days');
}

export const getCompetitionStatus = (startDate: string, endDate: string): string => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) {
    return '대회예정';
  } else if (today >= start && today <= end) {
    return '진행중';
  } else {
    return '대회종료';
  }
};
