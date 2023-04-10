import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { ITask, getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';
import { AppContext } from '../context/AppContext';
import { RiRepeatFill } from 'react-icons/ri';

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const { id, title, done, isPeriodic } = task;
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
        {title} {isPeriodic && <StyledRiRepeatFill color='#00d75d' />}
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
  user-select: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px 0px
      ${(p) => (p.darkMode ? '#ffffffcb' : '#006baee4')};
  }
`;

const StyledRiRepeatFill = styled(RiRepeatFill)`
  margin-bottom: -3px;
  /* color: red; */
`;
