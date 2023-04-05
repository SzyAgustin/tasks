import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderBox>
      <p>Tareas de hoy</p>
      <p>Agregar tareas</p>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  height: 80px;
  background-color: #000019;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.85);
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.85);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.85);
`;
