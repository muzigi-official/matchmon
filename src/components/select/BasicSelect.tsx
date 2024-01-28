import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  title: string;
  items: { value: string; name: string }[];
  onSelect: (selectedValue: string) => void;
  defaultValue?: string | undefined;
}

export default function BasicSelect(props: Props) {
  const { title, items, defaultValue = '', onSelect } = props;
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
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
      </FormControl>
    </Box>
  );
}
