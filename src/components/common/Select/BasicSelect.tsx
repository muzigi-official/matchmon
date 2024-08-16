import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import SelectOptions from '@/components/common/Select/SelectOptions';
import { capitalizeFirstLetter } from '@/utils/string';

import { SelectContainer, SelectButton, SelectMenu, SelectGroup, SelectSearchInput, InputLabel } from './Select.styles';

interface ISelectProps {
  options: ISelectProperty[];
  name: string;
  value?: string | number;
  label?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  searchable?: boolean;
  onSelect: (value: ISelectProperty) => void;
}

const BasicSelect = forwardRef<HTMLDivElement, ISelectProps>(
  ({ options, label, name, value, defaultValue = '', disabled = false, searchable = false, onSelect }, ref) => {
    const [selectedText, setSelectedText] = useState<string>(() => {
      const initialOption = options.find(option => option.value === defaultValue);
      return initialOption ? initialOption.text : '';
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const menuRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current || document.createElement('div'));

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (option: ISelectProperty) => {
      onSelect(option);
      setSelectedText(option.text);
      setSearchTerm('');
      setIsOpen(false);
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
      setSelectedText(selectedOption ? selectedOption.text : '');
    }, [value, options]);

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
        {label && (
          <InputLabel $isOpen={!!(isOpen || selectedText)} $hasValue={!!selectedText}>
            {capitalizeFirstLetter(label)}
          </InputLabel>
        )}
        <SelectButton onClick={handleToggle} $open={isOpen} $disabled={disabled}>
          <span>
            {searchable ? (
              <SelectSearchInput
                type='text'
                name={name}
                value={isOpen ? searchTerm : selectedText}
                onChange={e => setSearchTerm(e.target.value)}
              />
            ) : (
              selectedText || defaultValue
            )}
          </span>
          <span>&#9662;</span>
        </SelectButton>
        <SelectMenu ref={menuRef} $open={isOpen}>
          {hasGroup ? (
            Object.keys(groupedOptions).map(group => (
              <SelectGroup key={group}>
                <strong>{group}</strong>
                <SelectOptions
                  options={groupedOptions[group]}
                  selected={selectedText}
                  handleOptionClick={handleOptionClick}
                />
              </SelectGroup>
            ))
          ) : (
            <SelectOptions options={filteredOptions} selected={selectedText} handleOptionClick={handleOptionClick} />
          )}
        </SelectMenu>
      </SelectContainer>
    );
  },
);

BasicSelect.displayName = 'BasicSelect';

export default BasicSelect;
