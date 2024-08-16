import { SelectOption } from './Select.styles';

interface ISelectOptionsProps {
  options: ISelectProperty[];
  selected: string | number;
  handleOptionClick: (option: ISelectProperty) => void;
}

const SelectOptions = ({ options, handleOptionClick, selected }: ISelectOptionsProps) => (
  <>
    {options.map(option => (
      <SelectOption
        key={option.value}
        onClick={() => handleOptionClick(option)}
        $isSelected={option.value === selected}
      >
        {option.text}
      </SelectOption>
    ))}
  </>
);

export default SelectOptions;
