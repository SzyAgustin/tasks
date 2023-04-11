import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';
import Logo from '../images/szy-tasks-logo.png';
import { userSignOut } from '../services/Firebase';

const Header = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const { user, setUser } = useContext(UserContext);

  const signOut = () => {
    userSignOut();
    setUser(undefined);
    localStorage.removeItem('tasks-user');
    setDarkMode(true);
  };

  return (
    <HeaderBox darkMode={darkMode} userIsLoggedIn={!!user}>
      <StyledImg src={Logo} alt='logo' />

      {user && <StyledP onClick={signOut}>Sign out</StyledP>}
    </HeaderBox>
  );
};

export default Header;

interface HeaderBoxProps {
  darkMode: boolean;
  userIsLoggedIn: boolean;
}

const HeaderBox = styled.div<HeaderBoxProps>`
  transition: 0.4s;
  height: 80px;
  background-color: ${(p) => (p.darkMode ? '#060619' : '#052b63')};
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.userIsLoggedIn ? 'space-between' : 'center')};
  color: white;
  /* font-weight: 700; */
  box-shadow: ${(p) =>
    p.darkMode
      ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
      : '0px 0px 9px 0px #04224e'};
  -webkit-box-shadow: ${(p) =>
    p.darkMode
      ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
      : '0px 0px 9px 0px #04224e'};
  -moz-box-shadow: ${(p) =>
    p.darkMode
      ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
      : '0px 0px 9px 0px #04224e'};
`;

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
`;

const StyledP = styled.p`
  cursor: pointer;
`;
