import React from 'react';
import styled from 'styled-components';
import TabOption from './TabOption';

interface TabsProps {
  firstOption: boolean;
  setFirstOption: (x: boolean) => void;
}

const Tabs = ({ firstOption, setFirstOption }: TabsProps) => {
  return (
    <TabsOptionsBox>
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

const TabsOptionsBox = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  margin-bottom: 15px;
`;
