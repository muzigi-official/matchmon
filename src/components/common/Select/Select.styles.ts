import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  font-size: 12px;
`;

export const SelectButton = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: inline-block;
    margin-left: 8px;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const SelectMenu = styled.ul<{ open: boolean }>`
  position: absolute;
  width: 100%;
  max-height: 200px;
  border-radius: 4px;
  background-color: #fff;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  list-style: none;
  display: ${({ open }) => (open ? 'block' : 'none')};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SelectOption = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryLight};
  }
`;
