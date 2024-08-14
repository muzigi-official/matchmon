import { forwardRef } from 'react';

import BasicSelect from './BasicSelect';

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
  defaultValue?: string | number;
  disabled?: boolean;
  searchable?: boolean;
  error?: string;
}

const FormSelect = forwardRef<HTMLDivElement, IFormSelectProps>(
  ({ options, name, value, onChange, onBlur, defaultValue, disabled = false, searchable = false, error }, ref) => {
    const handleSelect = (selectedOption: ISelectProperty) => {
      onChange(selectedOption.value);
    };

    return (
      <div>
        <BasicSelect
          ref={ref}
          options={options}
          label={name}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onSelect={handleSelect}
          disabled={disabled}
          searchable={searchable}
        />
        <input type='hidden' name={name} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
