import { useState, useRef } from 'react';
import { Control, useController, FieldValues, Path, PathValue } from 'react-hook-form';
import { SelectContainer, SelectButton, SelectMenu, SelectOption } from './Select.styles';

interface FormSelectProps<T extends FieldValues> {
  options: ISelectProperty[];
  label: string;
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  rules?: object;
  disabled?: boolean;
}

const FormSelect = <T extends FieldValues>({
  options,
  label,
  name,
  control,
  defaultValue,
  rules,
  disabled,
}: FormSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: (defaultValue as PathValue<T, Path<T>>) || '',
    rules,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: ISelectProperty) => {
    field.onChange(option.value);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectButton onClick={handleToggle} isOpen={isOpen} disabled={disabled}>
        {field.value || label}
        <span>&#9662;</span>
      </SelectButton>
      <SelectMenu ref={menuRef} open={isOpen}>
        {options.map((option, index) => (
          <SelectOption key={index} onClick={() => handleOptionClick(option)}>
            {option.text}
          </SelectOption>
        ))}
      </SelectMenu>
      <input type='hidden' name={name} value={field.value} ref={field.ref} />
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </SelectContainer>
  );
};

export default FormSelect;
