import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { ITask } from '../services/TaskService';
import Loading from './Loading';
import AddTaskButton from './AddTaskButton';
import TaskList from './TaskList';

interface Props {
  title: string;
  tasks: ITask[];
  loadingTasks: boolean;
  setTodayTasks: (x: ITask[]) => void;
}

const Section = ({ title, tasks, loadingTasks, setTodayTasks }: Props) => {
  return (
    <SectionBox>
      <TitleBox>
        <h2>{title}</h2>
        <AddTaskButton />
      </TitleBox>
      <TasksBox>
        {loadingTasks ? (
          <Loading />
        ) : (
          <TaskList tasks={tasks} setTodayTasks={setTodayTasks} />
        )}
      </TasksBox>
    </SectionBox>
  );
};

export default Section;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionBox = styled.div`
  width: 80%;
  margin: 45px auto 0 auto;
`;

const TasksBox = styled.div`
  margin: 0 auto;
  width: 80%;
`;
