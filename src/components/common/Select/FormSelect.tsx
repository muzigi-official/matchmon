import { useState, useEffect, forwardRef } from 'react';
import SelectGroupOptions from './SelectGroupOptions';
import { ClickOutsideProvider, useClickOutside } from './ClickOutSideProvider';
import { SelectContainer, SelectButton, SelectMenu, SelectGroup, SelectSearchInput } from './Select.styles';

interface IFormSelectProps {
  options: ISelectProperty[];
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur: () => void;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
}

const FormSelect = forwardRef<HTMLDivElement, IFormSelectProps>(
  ({ options, name, value, onChange, onBlur, defaultValue = name, disabled, error }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedText, setSelectedText] = useState<string>(defaultValue);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { ref: containerRef } = useClickOutside();

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (option: ISelectProperty) => {
      onChange(option.value);
      setSelectedText(option.text);
      setIsOpen(false);
      setSearchTerm('');
    };

    const filteredOptions = options.filter(option => option.text.toLowerCase().includes(searchTerm.toLowerCase()));
    const hasGroup = options.some(option => option.group);
    const groupedOptions = hasGroup
      ? filteredOptions.reduce((acc: Record<string, ISelectProperty[]>, option) => {
          const group = option.group || '';
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(option);
          return acc;
        }, {})
      : {};

    useEffect(() => {
      const selectedOption = options.find(option => option.value === value);
      setSelectedText(selectedOption ? selectedOption.text : name);
    }, [value, options, name]);

    return (
      <ClickOutsideProvider onClickOutside={() => setIsOpen(false)}>
        <SelectContainer ref={ref}>
          <SelectButton onClick={handleToggle} open={isOpen} disabled={disabled}>
            <SelectSearchInput
              type='text'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={selectedText}
            />
            <span>&#9662;</span>
          </SelectButton>
          <SelectMenu ref={containerRef} open={isOpen}>
            {hasGroup ? (
              Object.keys(groupedOptions).map(group => (
                <SelectGroup key={group}>
                  <strong>{group}</strong>
                  <SelectGroupOptions options={groupedOptions[group]} handleOptionClick={handleOptionClick} />
                </SelectGroup>
              ))
            ) : (
              <SelectGroupOptions options={filteredOptions} handleOptionClick={handleOptionClick} />
            )}
          </SelectMenu>
          <input type='hidden' name={name} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </SelectContainer>
      </ClickOutsideProvider>
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
