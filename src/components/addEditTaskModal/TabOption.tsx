import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
interface TabOptionProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TabOption = ({ name, isActive, onClick }: TabOptionProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <OptionBox onClick={onClick} darkMode={darkMode} isActive={isActive}>
      {name}
    </OptionBox>
  );
};

export default TabOption;

interface OptionBoxProps {
  isActive: boolean;
  darkMode: boolean;
}

const OptionBox = styled.div<OptionBoxProps>`
  transition: 0.05s;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  background-color: ${(p) =>
    p.isActive
      ? p.darkMode
        ? '#ffffff22'
        : '#006bae32'
      : p.darkMode
      ? '#000000b0'
      : '#008adf20'};
  cursor: pointer;

  &:hover {
    transition: 0.1s;
    ${(p) =>
      p.isActive
        ? ''
        : p.darkMode
        ? 'background-color: #00000074;'
        : 'background-color: #008adf28;'};
  }
`;
