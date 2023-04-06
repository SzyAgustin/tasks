import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { ILocalTask, ITask } from '../services/TaskService';
import Loading from './Loading';

interface Props {
  title: string;
  tasks: ITask[];
  loadingTasks: boolean;
  setTodayTasks: (x: ITask[]) => void;
}

const Section = ({ title, tasks, loadingTasks, setTodayTasks }: Props) => {
  return (
    <SectionBox>
      <h2>{title}</h2>
      <TasksBox>
        {loadingTasks ? (
          <Loading />
        ) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              done={task.done}
              setTodayTasks={setTodayTasks}
              todayTasks={tasks}
            />
          ))
        )}
      </TasksBox>
    </SectionBox>
  );
};

export default Section;

const SectionBox = styled.div`
  width: 80%;
  margin: 10px auto 0 auto;
`;

const TasksBox = styled.div`
  margin: 0 auto;
  width: 80%;
`;
