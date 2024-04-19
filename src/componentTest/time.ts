export function timeData() {
  const timeArray = [];

  // 시작 시간과 종료 시간 설정
  const startTime = 0; // 00:00
  const endTime = 24 * 60; // 23:45까지의 총 분
  
  // 15분 간격으로 반복문을 돌면서 배열에 시간을 추가
  for (let i = startTime; i <= endTime; i += 15) {
      const hours = Math.floor(i / 60); // 시간 계산
      const minutes = i % 60; // 분 계산
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // 시간을 00:00 형식으로 변환
      timeArray.push(formattedTime); // 배열에 추가
  }
  return timeArray;
}
