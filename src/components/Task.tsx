import React, { useState, useContext, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';
import { AppContext } from '../context/AppContext';
import TaskAddEdit from './TaskAddEdit';
import { FlexCenterBox } from './FlexCenterBox';

interface Props {
  id: string;
  title: string;
  done: boolean;
}

const Task = ({ id, title, done }: Props) => {
  const { darkMode, todayTasks, setTodayTasks, handleDelete } =
    useContext(AppContext);
  const [loadingTaskChange, setLoadingTaskChange] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const setTask = (id: string, value: boolean) => {
    setLoadingTaskChange(true);
    const taskRef = getTask(id);
    updateDoc(taskRef, {
      done: value,
    })
      .then(() => {
        const tasks = todayTasks.map((task) =>
          task.id === id ? { ...task, done: value } : task
        );
        setTodayTasks(tasks);
      })
      .catch((err) => {
        console.log(err); //TODO: agregar toaster para mostrar este error
      })
      .finally(() => {
        setLoadingTaskChange(false);
      });
  };

  const handleClick = (e: any) => {
    if (e.detail === 2) {
      setEditMode(true);
    }
  };

  return (
    <>
      {!editMode ? (
        <TaskBox darkMode={darkMode} onClick={handleClick}>
          <FlexCenterBox>
            <DeleteButton onClick={() => handleDelete(id)}>x</DeleteButton>
            <Divider>|</Divider>
            <Title>{title}</Title>
          </FlexCenterBox>
          <Switch
            onChange={() => setTask(id, !done)}
            checked={done}
            onColor='#00d75d'
            disabled={loadingTaskChange}
          />
        </TaskBox>
      ) : (
        <TaskAddEdit
          title={title}
          id={id}
          notEditMode={() => setEditMode(false)}
        />
      )}
    </>
  );
};

export default Task;

interface TaskBoxProps {
  darkMode: boolean;
}

export const TaskBox = styled.div<TaskBoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 1em;
  user-select: none;
`;

const Divider = styled.p`
  margin-bottom: 3.5px;
`;

const Title = styled.p`
  margin-bottom: 1.2px;
  margin-left: 5px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px;
  border-radius: 4px;
  margin-right: 5px;
  background-color: #da0c0c;
  color: white;
  padding: 2px 7px;
  font-size: 16px;
  cursor: pointer;
`;
