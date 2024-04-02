import * as React from 'react';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

import { FormLabel, FormSelect, SelectOption } from './InputSelect.style';

interface Props {
  label: string;
  options: SelectProperty[];
  register: UseFormRegisterReturn;
  errors: FieldErrors | undefined;
}

export default function InputSelect({ label, register, errors, options }: Props) {
  const { name } = register;

  const handleScroll = () => {
    console.log('scroll 중');
  };

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FormSelect {...register}>
        {/* // FIXME: select에 무한 스크롤 시킬 수 있는지 */}
        {options.map((option, index) => (
          <SelectOption key={`${index}_${option.text}`} value={option.value}>
            {option.text}
          </SelectOption>
        ))}
      </FormSelect>
      {errors
        ? errors[name]?.type === 'required' && (
            <p className='error' role='alert'>
              {/* //FIXME: TO. 철: error 해결을 못하겠음 */}
              {errors[name].message}
            </p>
          )
        : ''}
    </>
  );
}
