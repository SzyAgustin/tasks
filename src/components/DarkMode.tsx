import React, { useContext } from 'react';
import Switch from 'react-switch';
import { AppContext } from '../context/AppContext';
import { FlexCenterBox } from './FlexCenterBox';
import styled from 'styled-components';

const DarkMode = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  return (
    <DarkModeBox>
      <p>Dark mode</p>
      <SwitchBox>
        <Switch
          onChange={() => setDarkMode(!darkMode)}
          checked={darkMode}
          onColor='#00d75d'
        />
      </SwitchBox>
    </DarkModeBox>
  );
};

export default DarkMode;

const DarkModeBox = styled(FlexCenterBox)`
  position: absolute;
  right: 30px;
  bottom: 20px;
`;

const SwitchBox = styled.div`
  margin-left: 5px;
  margin-bottom: 0;
  padding: 0;
`;
