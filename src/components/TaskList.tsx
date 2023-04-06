import React, { useContext } from 'react';
import { ITask } from '../services/TaskService';
import Task from './Task';
import TaskAdd from './TaskAdd';
import { AppContext } from '../context/AppContext';

interface TaskListProps {
  tasks: ITask[];
  setTodayTasks: (x: ITask[]) => void;
}

const TaskList = ({ tasks, setTodayTasks }: TaskListProps) => {
  const { isAddingTask } = useContext(AppContext);
  return (
    <>
      {isAddingTask && <TaskAdd />}
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          setTodayTasks={setTodayTasks}
          todayTasks={tasks}
        />
      ))}
    </>
  );
};

export default TaskList;
