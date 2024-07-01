import { useState, useRef } from 'react';
import { Control, useController, FieldValues } from 'react-hook-form';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles';

interface FormSelectProps<T extends FieldValues> {
  options: string[];
  label: string;
  name: string;
  control: Control<T>;
  defaultValue?: string;
}

const FormSelect = <T extends FieldValues>({ options, label, name, control, defaultValue }: FormSelectProps<T>) => {
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue || '',
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    field.onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectButton onClick={handleToggle} isOpen={isOpen}>
        {field.value || label}
        <span>&#9662;</span>
      </SelectButton>
      <SelectMenu ref={menuRef} open={isOpen}>
        {options.map((option, index) => (
          <SelectOption key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </SelectOption>
        ))}
      </SelectMenu>
      <input type='hidden' name={name} value={field.value} ref={field.ref} />
    </SelectContainer>
  );
};

export default FormSelect;
