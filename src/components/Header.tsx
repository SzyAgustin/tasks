import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <HeaderBox darkMode={darkMode}>
      <p>Mi día</p>
      <p>Agregar tareas</p>
    </HeaderBox>
  );
};

export default Header;

interface HeaderBoxProps {
  darkMode: boolean;
}

const HeaderBox = styled.div<HeaderBoxProps>`
  transition: 0.4s;
  height: 80px;
  background-color: ${(p) => (p.darkMode ? '#060619' : '#052b63')};
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
