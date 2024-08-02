import { useState, useRef, useEffect } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles.ts';

interface CustomSelectProps {
  options: ISelectProperty[];
  label: string;
  defaultValue: string | number | undefined;
  onSelect?: (option: string | number | undefined) => void;
}

const CustomSelect = ({ options, label, defaultValue, onSelect }: CustomSelectProps) => {
  const [selectedText, setSelectedText] = useState<string | number>(() => {
    const defaultOption = options.find(option => option.value === defaultValue);
    return defaultOption ? defaultOption.text : '';
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ISelectProperty) => {
    setSelectedText(option.text);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const defaultOption = options.find(option => option.value === defaultValue);
    setSelectedText(defaultOption ? defaultOption.text : '');
  }, [defaultValue, options]);

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
        {selectedText || label}
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
