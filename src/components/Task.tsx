import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { ITask, getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';

interface Props {
  id: string;
  title: string;
  done: boolean;
  todayTasks: ITask[];
  setTodayTasks: (x: ITask[]) => void;
}

const Task = ({ id, title, done, todayTasks, setTodayTasks }: Props) => {
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

  return (
    <TaskBox>
      <p>{title}</p>
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

const TaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff22;
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 1em;
`;
