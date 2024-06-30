import dayjs from 'dayjs';

export function diffDate(start: string | Date, end: string | Date) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  return endDate.diff(startDate, 'days');
}
