import { useState } from 'react';

import { Button } from '@mui/material';

interface IDropdownProps {
  options: string[];
}

export default function Dropdown({ options }: IDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const closeStyle = { display: 'none' };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{selectedValue ? selectedValue : 'selectedValue'}</Button>
      {options.map(option => {
        return (
          <p
            key={option}
            style={(!open && closeStyle) || {}}
            onClick={() => {
              setSelectedValue(option);
              setOpen(false);
            }}
          >
            {option}
          </p>
        );
      })}
    </>
  );
}
