import { SelectOption } from './Select.styles';

interface SelectGroupOptionsProps {
  options: ISelectProperty[];
  handleOptionClick: (option: ISelectProperty) => void;
}

const SelectGroupOptions = ({ options, handleOptionClick }: SelectGroupOptionsProps) => (
  <>
    {options.map((option, index) => (
      <SelectOption key={index} onClick={() => handleOptionClick(option)}>
        {option.text}
      </SelectOption>
    ))}
  </>
);

export default SelectGroupOptions;
