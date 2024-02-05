import BasicSelect from 'src/components/select/BasicSelect';

const filterTitle = '나이';
const filterItems = [
  { value: '0', name: '10세 미만' },
  { value: '10', name: '10대' },
  { value: '20', name: '20대' },
  { value: '30', name: '30대' },
  { value: '40', name: '40대' },
  { value: '50', name: '50대' },
  { value: '60', name: '60세 이상' },
];
interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
}
export default function AgeSelector(props: Props) {
  const { defaultValue, onChange } = props;
  return (
    <BasicSelect title={filterTitle} items={filterItems} onSelect={onChange} defaultValue={defaultValue}></BasicSelect>
  );
}
