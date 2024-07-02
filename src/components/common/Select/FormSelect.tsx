import { useState, useRef, useEffect, forwardRef } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles';

interface FormSelectProps {
  options: ISelectProperty[];
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  onBlur: () => void;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
}

const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  ({ options, label, name, value, onChange, onBlur, defaultValue = label, disabled, error }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedText, setSelectedText] = useState<string>(defaultValue);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      const selectedOption = options.find(option => option.value === value);
      setSelectedText(selectedOption ? selectedOption.text : label);
    }, [value, options, label]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (option: ISelectProperty) => {
      onChange(option.value);
      setIsOpen(false);
    };

    return (
      <SelectContainer ref={ref}>
        <SelectButton onClick={handleToggle} open={isOpen} disabled={disabled}>
          {selectedText}
          <span>&#9662;</span>
        </SelectButton>
        <SelectMenu ref={menuRef} open={isOpen}>
          {options.map((option, index) => (
            <SelectOption key={index} onClick={() => handleOptionClick(option)}>
              {option.text}
            </SelectOption>
          ))}
        </SelectMenu>
        <input type='hidden' name={name} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </SelectContainer>
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
