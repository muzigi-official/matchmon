import { useEffect, useState } from 'react';

import SelectorInput from './SelectorInput';
import styles from './RangeInput.module.css';

interface Props {
  start: RangeOptions;
  end: RangeOptions;
  onSelect: (name: string, value: string) => void;
}

export default function RangeInput({start, end, onSelect}: Props) {
  const [startData, setStartData] = useState<RangeOptions>(start);
  const [endData, setEndData] = useState<RangeOptions>(end);

  useEffect(() => {
    setStartData(start);
    setEndData(end);
  }, [start, end]);

  const changeValue = (name: string , value: string) => {
    console.log('rangeInput,', name, value);
    console.log('values,', start.selectedValue, end.selectedValue);
    onSelect(name, value);
  }
  return (
    <div className={styles.container}>
      <SelectorInput inputName='startTime' defaultValue={start.selectedValue} options={start.options} onChange={changeValue} /> 
      <span>-</span>
      <SelectorInput inputName='endTime' defaultValue={end.selectedValue} options={end.options} onChange={changeValue} />
    </div>
  );
}
