import React, { useContext, useState } from 'react';
import { TaskBox } from './Task';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';

const TaskAdd = () => {
  const { darkMode } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleAdd = () => {
    setLoading(true);
  };

  return (
    <TaskBox darkMode={darkMode}>
      <Input
        darkMode={darkMode}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='Nombre de la tarea...'
        autoFocus
      ></Input>
      <AddButton
        darkMode={darkMode}
        loading={loading}
        disabled={value.length <= 5}
        onClick={handleAdd}
      >
        {loading ? '-' : 'Agregar'}
      </AddButton>
    </TaskBox>
  );
};

export default TaskAdd;

const AddButton = styled.button<InputProps>`
  transition: 0.4s;
  padding: 4px 10px;
  border: 0px;
  border-radius: 4px;
  background-color: ${(p) =>
    p.disabled ? 'gray' : p.darkMode ? '#2862b9' : '#2463c1'};
  color: white;
  cursor: pointer;
  min-width: ${(p) => (p.loading ? '30px' : '100px')};

  &:hover {
    background-color: ${(p) =>
      p.disabled ? 'gray' : p.darkMode ? '#2862b9' : '#2463c1'};
  }
`;

interface InputProps {
  darkMode: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Input = styled.input<InputProps>`
  transition: 0.4s;
  font-size: 18px;
  width: 80%;
  background-color: transparent;
  border: 0px;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
  font-style: oblique;

  &:focus-visible {
    border: transparent;
    outline: none;
  }

  &::placeholder {
    transition: 0.4s;
    color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
  }
`;
