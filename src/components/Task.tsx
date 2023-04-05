import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

interface Props {
  title: string;
  done: boolean;
}

const Task = ({ title, done }: Props) => {
  const handleChange = () => {};

  return (
    <TaskBox>
      <p>{title}</p>
      <Switch onChange={handleChange} checked={done} onColor='#00d75d' />
    </TaskBox>
  );
};

export default Task;

const TaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff22;
  padding: 0.5em 1em;
  border-radius: 3px;
  margin-bottom: 1em;
`;
