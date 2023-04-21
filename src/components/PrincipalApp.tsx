import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Section from './Section';
import DarkMode from './DarkMode';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { UserContext } from '../context/UserContext';
import SignIn from './SignIn';
import { mediaQueryMaxWidth } from './constants';

const PrincipalApp = () => {
  const { darkMode, getTasksSorted } = useContext(AppContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    user && getTasksSorted();
  }, [getTasksSorted, user]);
  return (
    <Box>
      <AppBox darkMode={darkMode}>
        <Header />
        {user ? (
          <>
            <SearchBar />
            <Section title='Tareas del día' />
            <DarkMode />
          </>
        ) : (
          <SignInBox>
            <SignIn />
          </SignInBox>
        )}
      </AppBox>
    </Box>
  );
};

export default PrincipalApp;

interface AppBoxProps {
  darkMode: boolean;
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const AppBox = styled.div<AppBoxProps>`
  transition: 0.4s;
  background-color: ${(p) => (p.darkMode ? '#10223c' : 'white')};
  color: ${(p) => (p.darkMode ? 'white' : '#04224e')};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SignInBox = styled.div`
  display: flex;
  align-items: center;
  height: calc(75vh - 80px);
`;
