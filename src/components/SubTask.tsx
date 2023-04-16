import React, { useState, useContext } from 'react';
import { ISubTask, ITask, getTask } from '../services/TaskService';
import styled from 'styled-components';
import Switch from 'react-switch';
import { updateDoc } from 'firebase/firestore';
import { AppContext } from '../context/AppContext';

interface SubTaskProps {
  subTask: ISubTask;
  allSubTasks: ISubTask[];
  taskId: string;
}

const SubTask = ({ subTask, allSubTasks, taskId }: SubTaskProps) => {
  const { todayTasks, setTodayTasks } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);

  const setSubTask = (value: boolean) => {
    setLoading(true);
    const taskRef = getTask(taskId);
    updateDoc(taskRef, {
      subTasks: allSubTasks.map((st) =>
        st.id === subTask.id ? { ...st, done: value } : st
      ),
    })
      .then(() => {
        const tasks = todayTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subTasks: allSubTasks.map((st) =>
                  st.id === subTask.id ? { ...st, done: value } : st
                ),
              }
            : task
        );
        setTodayTasks(tasks);
      })
      .catch((err) => {
        console.log(err); //TODO: agregar toaster para mostrar este error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SubTaskBox>
      <p>{subTask.title}</p>
      <Switch
        checked={subTask.done}
        onChange={() => setSubTask(!subTask.done)}
        onColor='#00d75d'
        disabled={loading}
      />
    </SubTaskBox>
  );
};

export default SubTask;

const SubTaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1.5em;
  margin-bottom: 2px;
  background-color: #ffffff21;
  &:hover {
    background-color: #ffffff33;
  }
`;
