import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SelectContainer, SelectButton, SelectMenu, SelectGroup, SelectSearchInput } from './Select.styles';
import SelectGroupOptions from './SelectGroupOptions';

interface ISelectProperty {
  value: string | number;
  text: string;
  group?: string;
}

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
  ({ options, name, value, onChange, onBlur, defaultValue = '', disabled, error }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedText, setSelectedText] = useState<string>(defaultValue);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const menuRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current || document.createElement('div'));

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
      <SelectContainer ref={containerRef}>
        <SelectButton onClick={handleToggle} open={isOpen} disabled={disabled}>
          <SelectSearchInput
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={selectedText}
          />
          <span>&#9662;</span>
        </SelectButton>
        <SelectMenu ref={menuRef} open={isOpen}>
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
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
