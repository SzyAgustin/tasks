import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

const AddTaskButton = () => {
  const { darkMode, isAddingTask, setIsAddingTask } = useContext(AppContext);

  const handleClick = () => {
    setIsAddingTask(!isAddingTask);
  };

  return (
    <AddButton darkMode={darkMode} onClick={handleClick}>
      {isAddingTask ? '-' : '+'}
    </AddButton>
  );
};

export default AddTaskButton;

interface AddButtonProps {
  darkMode: boolean;
}

const AddButton = styled.button<AddButtonProps>`
  transition: 0.4s;
  width: 40px;
  height: 40px;
  border: 0px;
  font-size: 30px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.darkMode ? '#2862b9' : '#2463c1')};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => (p.darkMode ? '#2862b9ce' : '#1364dece')};
  }
`;
