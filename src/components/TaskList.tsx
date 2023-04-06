import React, { useContext } from 'react';
import Task from './Task';
import TaskAddEdit from './TaskAddEdit';
import { AppContext } from '../context/AppContext';
import { FlexCenterBox } from './FlexCenterBox';

const TaskList = () => {
  const { isAddingTask, todayTasks } = useContext(AppContext);
  return (
    <>
      {isAddingTask && <TaskAddEdit />}
      {!isAddingTask && todayTasks.length === 0 && (
        <FlexCenterBox>
          Aún no tienes tareas para el dia de hoy. Agrega una!
        </FlexCenterBox>
      )}
      {todayTasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.title} done={task.done} />
      ))}
    </>
  );
};

export default TaskList;
