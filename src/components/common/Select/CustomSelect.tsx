import { useState, useRef } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles.ts';

interface CustomSelectProps {
  options: string[];
  label: string;
  onSelect?: (option: string) => void;
}

const CustomSelect = ({ options, label, onSelect }: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <SelectContainer>
      <SelectButton onClick={handleToggle}>
        {selectedValue || label}
        <span>&#9662;</span>
      </SelectButton>
      <SelectMenu ref={menuRef} open={isOpen}>
        {options.map((option, index) => (
          <SelectOption key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </SelectOption>
        ))}
      </SelectMenu>
    </SelectContainer>
  );
};

export default CustomSelect;
