import React, { useContext } from 'react';
import Task from './Task';
import TaskAddEdit from './TaskAddEdit';
import { AppContext } from '../context/AppContext';

const TaskList = () => {
  const { isAddingTask, todayTasks } = useContext(AppContext);
  return (
    <>
      {isAddingTask && <TaskAddEdit />}
      {todayTasks.map((task) => (
        <Task key={task.id} id={task.id} title={task.title} done={task.done} />
      ))}
    </>
  );
};

export default TaskList;
