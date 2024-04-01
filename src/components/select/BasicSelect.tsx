import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import * as S from './BasicSelect.style';

interface Props {
  title: string;
  size?: 'small' | 'medium';
  items: SelectProperty[];
  margin?: number;
  onSelect: (selectedValue: string) => void;
  defaultValue?: string | undefined;
}

export default function BasicSelect(props: Props) {
  const { title, items, defaultValue = '', margin = 0, onSelect, size = 'medium' } = props;
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <S.FormsGroup sx={{ m: margin, minWidth: 180 }} size={size}>
      <InputLabel>{title}</InputLabel>
      <Select value={selectedValue} label={title} onChange={handleChange}>
        {items.map(item => {
          return (
            <MenuItem value={item.value} key={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </S.FormsGroup>
  );
}
