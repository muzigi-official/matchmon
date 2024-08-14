import React, { forwardRef } from 'react';
import BasicSelect from './BasicSelect';

interface ISelectProperty {
  value: string | number;
  text: string;
  group?: string;
}

interface IFormSelectProps {
  options: ISelectProperty[];
  name: string;
  label?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur: () => void;
  defaultValue?: string | number;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
}

const FormSelect = forwardRef<HTMLDivElement, IFormSelectProps>(
  (
    { options, label, name, value, onChange, onBlur, defaultValue, disabled = false, searchable = false, error },
    ref,
  ) => {
    const handleSelect = (selectedOption: ISelectProperty) => {
      onChange(selectedOption.value); // 선택된 값의 value를 전달
    };

    return (
      <React.Fragment>
        <BasicSelect
          ref={ref}
          options={options}
          label={label || name}
          name={name}
          value={value} // value를 전달
          defaultValue={defaultValue}
          onSelect={handleSelect} // 선택 핸들러 전달
          disabled={disabled}
          searchable={searchable}
        />
        <input type='hidden' name={name} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </React.Fragment>
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
