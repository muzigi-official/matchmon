import styled from 'styled-components';

import { colors } from '@/styles/colors';

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 0px;
  width: 100%;
`;

export const InputLabel = styled.label<{ $isOpen: boolean; $hasValue: boolean }>`
  position: absolute;
  left: 12px;
  top: ${({ $isOpen, $hasValue }) => ($isOpen || $hasValue ? '-15px' : '2px')}; /* Adjusted for floating effect */
  font-size: ${({ $isOpen, $hasValue }) => ($isOpen || $hasValue ? '12px' : '16px')};
  color: ${({ $isOpen, $hasValue }) => ($isOpen || $hasValue ? colors.primary : colors.text.placeholder)};
  background: ${colors.white};
  padding: 0 4px;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
`;

export const SelectButton = styled.div<{ $open: boolean; $disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  border: solid 1px ${colors.border.darken};
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;

  ${({ $open }) =>
    $open &&
    `
    outline: none;
    border-color: ${colors.primary};
  `}

  ${({ $disabled }) =>
    $disabled &&
    `
    background-color: ${colors.disabled.backgroundColor};
    cursor: not-allowed;
  `}

  span:first-child {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span:last-child {
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s;
    pointer-events: none;
  }
`;

export const SelectSearchInput = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const SelectMenu = styled.ul<{ $open: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid ${colors.border.basic};
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: ${({ $open }) => ($open ? '200px' : '0')};
  overflow-y: auto;
  transition: max-height 0.3s ease;
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;

export const SelectOption = styled.li<{ $isSelected: boolean }>`
  padding: 0.625rem;
  cursor: pointer;
  font-size: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primaryOpacity : 'transparent')};
  &:hover {
    background-color: ${colors.hover};
  }
`;

export const SelectGroup = styled.div`
  padding: 8px;
  font-size: 0.8125rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.border.darken};
  }

  strong {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }
`;
