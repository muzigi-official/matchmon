import styled from 'styled-components';

import { colors } from '@/styles/colors';

export const SelectContainer = styled.div`
  position: relative;
  font-size: 0.75rem;
  text-align: left;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  padding: 0.25rem;
`;

export const SelectButton = styled.div<{ $open: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px #efefef;
  border-radius: 0.25rem;
  padding: 0.75rem;
  cursor: pointer;
  background-color: ${({ $disabled }) => ($disabled ? colors.disabled.backgroundColor : colors.white)};
  color: ${({ $disabled }) => ($disabled ? colors.disabled.color : colors.black)};
  gap: 0.5rem;

  &:hover {
    border-color: ${({ $disabled }) => ($disabled ? colors.disabled.border : colors.primary)};
  }

  span {
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s;
  }
`;

export const SelectSearchInput = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  outline: none;
`;

export const SelectMenu = styled.ul<{ $open: boolean }>`
  position: absolute;
  width: 100%;
  max-height: 12.5rem;
  border-radius: 0.25rem;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
  list-style: none;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

export const SelectOption = styled.li<{ $isSelected: boolean }>`
  padding: 0.625rem;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primaryOpacity : 'transparent')};
  &:hover {
    background-color: ${colors.hover};
  }
`;

export const SelectGroup = styled.div`
  padding: 0.5rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.border.darken};
  }

  strong {
    display: block;
    padding: 0.25rem 0.5rem;
    background-color: ${colors.white};
  }
`;
