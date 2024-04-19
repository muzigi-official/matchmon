import { useState } from 'react';
import Button from '../button/Button';
import ActionBox from './ActionBox';
import styles from './DayContainer.module.css';

interface WorkingTimeData {
  order: number;
  startTime: string;
  endTime: string;
}

interface Props {
  day: string;
  onChangeHandler: (datas: WorkingTimeData[], day: string) => void;
}

export default function DayContainer({ day, onChangeHandler }: Props) {
  const [timeItem, setTimeItem] = useState<WorkingTimeData[]>([]);

  const clickPlusButton = () => {
    console.log('+');
    setTimeItem(prevState => {
      const lastIndex = prevState.length - 1;
      console.log('prevState', prevState, prevState[lastIndex]);
      const order = lastIndex >= 0 ? prevState[lastIndex].order + 1 : 1;
      // const startTime = prevState[lastIndex].startTime;
      // const endTime = prevState[lastIndex].endTime;
      return [...prevState, { order: order, startTime: '', endTime: '' }];
    });
    // console.log(timeItem);
    onChangeHandler(timeItem, day);
  };

  const clickRemoveButton = (order: number) => {
    console.log('remove', order);
    setTimeItem(prevState => {
      const filteredItems = prevState.filter(item => item.order !== order);
      return filteredItems;
    });
  };

  const changeTime = (name: string, value: string) => {
    console.log('change1111', name, value);
    // onChangeHandler(name, value)
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.title}>{day}</div>
        <div className={styles.action}>
          {timeItem.length === 0 ? (
            <Button variant='text' onClick={clickPlusButton}>
              +
            </Button>
          ) : (
            <>
              {timeItem.map((item, index) => {
                return (
                  <ActionBox
                    key={index}
                    item={item}
                    isLast={timeItem.length - 1 === index}
                    onAdd={clickPlusButton}
                    onRemove={clickRemoveButton}
                    onChange={changeTime}
                  />
                );
              })}
            </>
          )}
        </div>
      </section>
      <hr />
    </>
  );
}
