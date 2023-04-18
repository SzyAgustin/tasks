import React, { useContext } from 'react';
import { GrFormClose } from 'react-icons/gr';
import styled from 'styled-components';
import { ISubTask } from '../../services/TaskService';
import { AppContext } from '../../context/AppContext';

interface SubTaskFormProps {
  subTask: ISubTask;
  deleteTask: (id: string) => void;
}

const SubTaskForm = ({ subTask, deleteTask }: SubTaskFormProps) => {
  const { darkMode } = useContext(AppContext);
  const { title, id } = subTask;
  return (
    <SubTaskBox darkMode={darkMode}>
      <p>{title}</p>
      <Button onClick={() => deleteTask(id)}>
        <GrFormClose />
      </Button>
    </SubTaskBox>
  );
};

export default SubTaskForm;

interface SubTaskBoxProps {
  darkMode: boolean;
}

const SubTaskBox = styled.div<SubTaskBoxProps>`
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${(p) => (p.darkMode ? '#ffffff1c' : '#006bae23')};
  margin-bottom: 1px;

  &:hover {
    background-color: ${(p) => (p.darkMode ? '##ffffff11' : '#006bae11')};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 5px;
  background-color: #ff1b1b;
  cursor: pointer;
`;
