import { styled } from '@mui/material/styles';

export const FormLabel = styled('label')`
  font-size: 12px;
`;

export const FormSelect = styled('select')`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 10px 16px 10px 4px;
  margin-bottom: 4px;
  font-size: 14px;

  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  background: url('/select-arrow2.png') no-repeat right 0.75rem center;

  select::-ms-expand {
    display: none; /*for IE10,11*/
  }
`;

export const SelectOption = styled('option')`
  display: block;
  box-sizing: border-box;
  background-color: white;
  font-size: 12px;
`;
