import React, { useContext } from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import AddTaskButton from './AddTaskButton';
import TaskList from './TaskList';
import { AppContext } from '../context/AppContext';

interface Props {
  title: string;
}

const Section = ({ title }: Props) => {
  const { loadingTasks } = useContext(AppContext);
  return (
    <SectionBox>
      <TitleBox>
        <h2>{title}</h2>
        <AddTaskButton />
      </TitleBox>
      <TasksBox>{loadingTasks ? <Loading /> : <TaskList />}</TasksBox>
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
  margin: 0 auto;
  padding-bottom: 70px;
`;

const TasksBox = styled.div`
  margin: 0 auto;
  width: 80%;
`;
