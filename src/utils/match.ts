export function generateSchedule(params: IScheduleParams): IMatchSchedule[] {
  const { startTime, matchDuration, breakTime, stadiums, groups } = params;
  const matchSchedules: IMatchSchedule[] = [];
  let currentTime = startTime;
  let stadiumIndex = 0;

  const groupKeys = Object.keys(groups);
  const matchesByGroup: { [groupName: string]: IMatchSchedule[] } = {};

  // 각 조별로 매치 리스트 생성
  groupKeys.forEach(groupName => {
    const teams = groups[groupName];
    const groupMatches: IMatchSchedule[] = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        groupMatches.push({
          matchTime: '',
          stadium: '',
          homeTeamId: teams[i].id,
          awayTeamId: teams[j].id,
          homeTeamName: teams[i].name,
          awayTeamName: teams[j].name,
        });
      }
    }
    matchesByGroup[groupName] = groupMatches;
  });

  const teamLastMatchTime: Record<number, string> = {};

  while (Object.values(matchesByGroup).some(group => group.length > 0)) {
    groupKeys.forEach(groupName => {
      const groupMatches = matchesByGroup[groupName];
      if (groupMatches.length > 0) {
        const match = groupMatches.shift()!;
        const stadium = stadiums[stadiumIndex];

        if (
          teamLastMatchTime[match.homeTeamId] === currentTime ||
          teamLastMatchTime[match.awayTeamId] === currentTime
        ) {
          currentTime = addMinutes(currentTime, matchDuration + breakTime);
        }

        match.stadium = stadium;
        match.matchTime = currentTime;
        matchSchedules.push({ ...match });

        teamLastMatchTime[match.homeTeamId] = currentTime;
        teamLastMatchTime[match.awayTeamId] = currentTime;

        stadiumIndex = (stadiumIndex + 1) % stadiums.length;

        if (stadiumIndex === 0) {
          currentTime = addMinutes(currentTime, matchDuration + breakTime);
        }
      }
    });
  }

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
