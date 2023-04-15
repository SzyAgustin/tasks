import React from 'react';
import styled from 'styled-components';

interface TabOptionProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TabOption = ({ name, isActive, onClick }: TabOptionProps) => {
  return (
    <OptionBox onClick={onClick} isActive={isActive}>
      {name}
    </OptionBox>
  );
};

export default TabOption;

interface OptionBoxProps {
  isActive: boolean;
}

const OptionBox = styled.div<OptionBoxProps>`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  background-color: ${(p) => (p.isActive ? 'gray' : 'black')};
  cursor: pointer;
`;
