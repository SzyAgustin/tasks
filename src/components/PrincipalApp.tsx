import React, { useContext, useEffect } from 'react';
import Header from './Header';
import Section from './Section';
import DarkMode from './DarkMode';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const PrincipalApp = () => {
  const { darkMode, getAllTasks } = useContext(AppContext);
  // const { user } = useContext(UserContext);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);
  return (
    <Box>
      <AppBox darkMode={darkMode}>
        <Header />
        <SearchBar />
        <Section title='Tareas del día' />
        <DarkMode />
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
`;

const AppBox = styled.div<AppBoxProps>`
  transition: 0.4s;
  background-color: ${(p) => (p.darkMode ? '#10223c' : 'white')};
  color: ${(p) => (p.darkMode ? 'white' : '#04224e')};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
