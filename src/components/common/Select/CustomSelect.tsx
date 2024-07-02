import { useState, useRef } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles.ts';

interface CustomSelectProps {
  options: ISelectProperty[];
  label: string;
  defaultValue: string | undefined;
  onSelect?: (option: string) => void;
}

const CustomSelect = ({ options, label, defaultValue, onSelect }: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue && '');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ISelectProperty) => {
    setSelectedValue(option.text);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.text);
    }
  };

  return (
    <SelectContainer>
      <SelectButton onClick={handleToggle} open={isOpen}>
        {selectedValue || label}
        <span>&#9662;</span>
      </SelectButton>
      <SelectMenu ref={menuRef} open={isOpen}>
        {options.map((option, index) => (
          <SelectOption key={index} onClick={() => handleOptionClick(option)}>
            {option.text}
          </SelectOption>
        ))}
      </SelectMenu>
    </SelectContainer>
  );
};

export default CustomSelect;
