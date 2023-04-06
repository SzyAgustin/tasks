import React, { useState, useContext, useEffect } from 'react';
import { ITask, getTasks } from '../services/TaskService';
import { getDocs } from 'firebase/firestore';
import Header from './Header';
import Section from './Section';
import DarkMode from './DarkMode';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';

const PrincipalApp = () => {
  const { darkMode, getAllTasks } = useContext(AppContext);

  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <Box>
      <AppBox darkMode={darkMode}>
        <Header />
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
  background-color: ${(p) => (p.darkMode ? '#04224e' : 'white')};
  color: ${(p) => (p.darkMode ? 'white' : '#04224e')};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
