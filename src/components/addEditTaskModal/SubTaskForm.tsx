import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import styled from 'styled-components';
import { ISubTask } from '../../services/TaskService';

interface SubTaskFormProps {
  subTask: ISubTask;
  deleteTask: (id: string) => void;
}

const SubTaskForm = ({ subTask, deleteTask }: SubTaskFormProps) => {
  const { title, id } = subTask;
  return (
    <SubTaskBox>
      <p>{title}</p>
      <Button onClick={() => deleteTask(id)}>
        <GrFormClose />
      </Button>
    </SubTaskBox>
  );
};

export default SubTaskForm;

const SubTaskBox = styled.div`
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff1c;
  margin-bottom: 1px;

  &:hover {
    background-color: #ffffff11;
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
