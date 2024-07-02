import { useState, useRef, useEffect } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles.ts';

interface CustomSelectProps {
  options: ISelectProperty[];
  label: string;
  defaultValue: string | undefined;
  onSelect?: (option: string) => void;
}

const CustomSelect = ({ options, label, defaultValue, onSelect }: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton onClick={handleToggle} open={isOpen}>
        {selectedValue || label}
        <span>&#9662;</span>
      </SelectButton>
      {isOpen && (
        <SelectMenu open={isOpen}>
          {options.map((option, index) => (
            <SelectOption key={index} onClick={() => handleOptionClick(option)}>
              {option.text}
            </SelectOption>
          ))}
        </SelectMenu>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
