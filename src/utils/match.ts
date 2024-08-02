export function generateSchedule(params: IScheduleParams): IMatchScheduleDto[] {
  const { startTime, matchDuration, breakTime, stadiums, groups } = params;
  const matchSchedules: IMatchScheduleDto[] = [];
  let currentTime = startTime;
  let stadiumIndex = 0;

  const groupKeys = Object.keys(groups);

  groupKeys.forEach(groupName => {
    const teams = groups[groupName];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matchSchedules.push({
          matchTime: currentTime,
          stadium: stadiums[stadiumIndex],
          homeTeamId: 0,
          awayTeamId: 0,
          homeTeamName: '',
          awayTeamName: '',
        });

        // Update stadium index and time
        stadiumIndex = (stadiumIndex + 1) % stadiums.length;
        if (stadiumIndex === 0) {
          currentTime = addMinutes(currentTime, matchDuration + breakTime);
        }
      }
    }
  });

  return matchSchedules;
}

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0');
  const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');
  return `${newHours}:${newMinutes}`;
}
