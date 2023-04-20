import React, { useContext } from 'react';
import Switch from 'react-switch';
import { AppContext } from '../context/AppContext';
import { FlexCenterBox } from './FlexCenterBox';
import styled from 'styled-components';
import { BsMoonFill } from 'react-icons/bs';
import { BsFillSunFill } from 'react-icons/bs';
import { mediaQueryMaxWidth } from './constants';

const DarkMode = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  return (
    <DarkModeBox>
      <SwitchBox>
        <Switch
          onChange={() => setDarkMode(!darkMode)}
          checked={darkMode}
          onColor='#341ff0'
          offColor='#02d5ff'
          checkedIcon={<DarkModeOnIcon />}
          uncheckedIcon={<DarkModeOffIcon />}
        />
      </SwitchBox>
    </DarkModeBox>
  );
};

const DarkModeOnIcon = () => {
  return (
    <IconBox>
      <BsMoonFill />
    </IconBox>
  );
};
const DarkModeOffIcon = () => {
  return (
    <IconBox>
      <BsFillSunFill color='#ffffff' />
    </IconBox>
  );
};

export default DarkMode;

const DarkModeBox = styled(FlexCenterBox)`
  position: absolute;
  right: 30px;
  bottom: 20px;

  @media (max-width: ${mediaQueryMaxWidth}) {
    visibility: hidden;
  }
`;

const SwitchBox = styled.div`
  margin-left: 5px;
  margin-bottom: 0;
  padding: 0;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 30px;
`;
