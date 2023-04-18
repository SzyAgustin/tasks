import React, { useContext } from 'react';
import styled from 'styled-components';
import TabOption from './TabOption';
import { AppContext } from '../../context/AppContext';

interface TabsProps {
  firstOption: boolean;
  setFirstOption: (x: boolean) => void;
}

const Tabs = ({ firstOption, setFirstOption }: TabsProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <TabsOptionsBox darkMode={darkMode}>
      <TabOption
        onClick={() => setFirstOption(true)}
        isActive={firstOption}
        name='Individual'
      />
      <TabOption
        onClick={() => setFirstOption(false)}
        isActive={!firstOption}
        name='Grupal'
      />
    </TabsOptionsBox>
  );
};

export default Tabs;

interface DarkModeProps {
  darkMode: boolean;
}

const TabsOptionsBox = styled.div<DarkModeProps>`
  display: flex;
  border-bottom: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  margin-bottom: 15px;
`;
