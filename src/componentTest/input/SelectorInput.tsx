import { useEffect, useState } from 'react';

import styles from './SelectorInput.module.css';

interface Props {
  options: string[];
  defaultValue?: string;
  inputName: string;
  onChange: (name: string, value: string) => void;
}

interface InputError {
  isError: boolean;
  errorMessage: string;
}

export default function SelectorInput({ options, defaultValue ='', inputName, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [filteringOptions, setFilterlingOptions] = useState<string[]>(options);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const [error, setError] = useState<InputError>({isError: false, errorMessage: ''});

  useEffect(() => {
    setFilterlingOptions(options);
  }, [options])
 
  const handleOnChangeSelectValue = (value: string) => {
    
    if(value && options.indexOf(value) > -1) {
      setError({ isError: false, errorMessage: ''});
    }
    setSelectedValue(value);
    onChange(inputName, value);
  };

  // const handleOutsideClick = (event: MouseEvent) => {
  //   const targetElement = event.target as HTMLElement;
  //   if (!targetElement.closest && !targetElement.closest('ul')) {
  //     setOpen(false); // 리스트 외부를 클릭하면 리스트를 닫습니다.
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setFilterlingOptions(() => {
      const searchOptions = options.filter(item => item.toLowerCase().startsWith(selectedValue.toLowerCase()));
      console.log(searchOptions);
      if(searchOptions.length === 0) {
        setError({ isError: true, errorMessage: '사용할 수 없는 값입니다.'});
      }else {
        setError({ isError: false, errorMessage: ''});
      }
      return searchOptions;
    });

    setSelectedValue(selectedValue);
    onChange(inputName, selectedValue);
  }


  return (
    <>
      <div className={styles.selectContainer} data-testid='custom-select-box' onClick={() => setOpen((prev) => !prev)}>
        <input type='text' name={inputName} value={selectedValue} onChange={handleChange} />
        {open && 
          <ul>
          {filteringOptions.map(option => {
            return (
              <li key={option}
                value={option}
                onClick={() => handleOnChangeSelectValue(option)}>{option}</li>
              );
              })}
          </ul>
        }
        <p className={styles.error} role='alert'>
          {error.isError ? error.errorMessage : ''}
        </p>
      </div>
    </>
  );
}
