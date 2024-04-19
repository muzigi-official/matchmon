import Button from '../button/Button';
import styles from './ActionBox.module.css';
import RangeInput from '../input/RangeInput';
import { timeData } from '../time';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TIME_DATA = timeData();

interface Props {
  item: WorkingTimeData;
  isLast: boolean;
  onAdd: () => void;
  onRemove: (order: number) => void;
  onChange: (name: string, value: string) => void;
}

export default function ActionBox({ item, isLast, onAdd, onRemove, onChange }: Props) {
  const startOptions = { options: TIME_DATA, selectedValue: item.startTime };
  const endOptions = { options: TIME_DATA, selectedValue: item.endTime };
  const changeRange = (name: string, value: string) => {
    console.log('actionBox', name, value);
    // { order: item.order, starttime: }
    onChange(name, value);
  };

  return (
    <>
      <div className={styles.container}>
        <span>{item.order}</span>
        <RangeInput start={startOptions} end={endOptions} onSelect={changeRange} />
        <Button variant='text' onClick={() => onRemove(item.order)}>
          <DeleteOutlineIcon />
        </Button>
        {isLast && (
          <Button variant='text' onClick={onAdd}>
            +
          </Button>
        )}
      </div>
    </>
  );
}
