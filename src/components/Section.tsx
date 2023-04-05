import React from 'react';
import { ITask } from '../interfaces/ITask';
import Task from './Task';
import styled from 'styled-components';

interface Props {
  title: string;
  tasks: ITask[];
}

const Section = ({ title, tasks }: Props) => {
  return (
    <SectionBox>
      <h2>{title}</h2>
      <TasksBox>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} done={task.done} />
        ))}
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
