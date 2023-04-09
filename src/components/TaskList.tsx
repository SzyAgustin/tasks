import React, { useContext } from 'react';
import Task from './Task';
import { AppContext } from '../context/AppContext';
import { FlexCenterBox } from './FlexCenterBox';

const TaskList = () => {
  const { todayTasks, searchValue } = useContext(AppContext);
  return (
    <>
      {todayTasks.length === 0 && (
        <FlexCenterBox>
          {searchValue
            ? 'No existe una tarea para esa busqueda.'
            : 'Aún no tienes tareas para el dia de hoy. Agrega una!'}
        </FlexCenterBox>
      )}
      {todayTasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.title} done={task.done} />
      ))}
    </>
  );
};

export default TaskList;
