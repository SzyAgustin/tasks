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
  const { loadingTasks, todayTasks, justTodayTasks, setJustTodayTasks } =
    useContext(AppContext);

  const amountOfDone = todayTasks.filter((task) => task.done).length;
  const amountOfTasks = todayTasks.length;
  return (
    <SectionBox>
      <SectionHeader>
        <div>
          <Title>
            {title} {!loadingTasks && `(${amountOfDone} de ${amountOfTasks})`}
          </Title>
          <JustTodayBox>
            <CheckBoxStyled
              type='checkbox'
              checked={justTodayTasks}
              onChange={() => setJustTodayTasks(!justTodayTasks)}
            />
            <p onClick={() => setJustTodayTasks(!justTodayTasks)}>
              Solo tareas de hoy
            </p>
          </JustTodayBox>
        </div>
        <AddTaskButton />
      </SectionHeader>
      <TasksBox>{loadingTasks ? <Loading /> : <TaskList />}</TasksBox>
    </SectionBox>
  );
};

export default Section;

const SectionHeader = styled.div`
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

const JustTodayBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 15px 0;
  cursor: pointer;
  user-select: none;
`;

const CheckBoxStyled = styled.input`
  margin-bottom: -1px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 0;
`;
