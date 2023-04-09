import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';
import { AppContext } from '../context/AppContext';

interface Props {
  id: string;
  title: string;
  done: boolean;
}

const Task = ({ id, title, done }: Props) => {
  const {
    darkMode,
    todayTasks,
    setTodayTasks,
    setIsAddingTask,
    setTaskToEditWithId,
  } = useContext(AppContext);
  const [loadingTaskChange, setLoadingTaskChange] = useState<boolean>(false);

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

  const handleClick = () => {
    setTaskToEditWithId(id);
    setIsAddingTask(true);
  };

  return (
    <TaskBox darkMode={darkMode}>
      <p style={{ width: '90%' }} onClick={handleClick}>
        {title}
      </p>
      <Switch
        onChange={() => setTask(id, !done)}
        checked={done}
        onColor='#00d75d'
        disabled={loadingTaskChange}
      />
    </TaskBox>
  );
};

export default Task;

interface TaskBoxProps {
  darkMode: boolean;
}

export const TaskBox = styled.div<TaskBoxProps>`
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 1em;
  user-select: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px 0px
      ${(p) => (p.darkMode ? '#ffffffcb' : '#006baee4')};
  }
`;
