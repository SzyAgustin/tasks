import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FlexCenterBox } from './FlexCenterBox';
import DragNDropList from './DragNDropList';

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
      <DragNDropList tasksList={todayTasks} />
    </>
  );
};

export default TaskList;
