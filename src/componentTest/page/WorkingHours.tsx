import DayContainer from '../workingHours/DayContainer';
import styles from './WorkingHours.module.css';
import Button from '../button/Button';
import { useState } from 'react';
import { workingHours } from '../defaultValue';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface WorkHours {
  [key: string]: WorkingTimeData[];
  sunday: WorkingTimeData[];
  monday: WorkingTimeData[];
  tuesday: WorkingTimeData[];
  wednesday: WorkingTimeData[];
  thursday: WorkingTimeData[];
  friday: WorkingTimeData[];
  saturday: WorkingTimeData[];
}

export default function WorkingHour() {
  const [workHours, setWorkhours] = useState<WorkHours>(workingHours);

  const changeWorkHours = (datas: any, day: string) => {
    console.log('change 최종 보스', datas, day);
    const key = day && day.toLocaleLowerCase();

    console.log(key);
    console.log(workHours);
    setWorkhours(prevState => {
      return prevState;
    });
    // setWorkhours((prevState: WorkHours) => {
    //   // console.log(prevState[key]);
    //   const updatedWorkhours = { ...prevState };
    //  // 해당 요일의 작업 시간을 업데이트
    //  if(updatedWorkhours[key].length === 0) {
    //   // updatedWorkhours[key] = { [name]: value };
    //  }else {
    //   updatedWorkhours[key] = updatedWorkhours[key].map((item: WorkingTimeData) => {
    //     // 기존 요소와 새로운 값을 함께 반환
    //     return { ...item, [name]: value };
    //   });
    //  }

    //   console.log("updatedWorkhours", updatedWorkhours);
    //   return updatedWorkhours;
    // });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h5>WorkingHours</h5>
        </div>
        <div className={styles.box}>
          <h5 className={styles.title}>Set your weekly hours</h5>
          <hr />
          <div className={styles.content}>
            {daysOfWeek.map((day, index) => (
              <DayContainer key={index} day={day} onChangeHandler={changeWorkHours} />
            ))}
          </div>
          <div className={styles.footer}>
            <Button variant='outlined'>cancel</Button>
            <Button>update</Button>
          </div>
        </div>
      </div>
    </>
  );
}
