import React from 'react';
import { ISubTask } from '../services/TaskService';
import styled from 'styled-components';
import Switch from 'react-switch';

interface SubTaskProps {
  subTask: ISubTask;
}

const SubTask = ({ subTask }: SubTaskProps) => {
  return (
    <SubTaskBox>
      <p>{subTask.title}</p>
      <Switch checked={subTask.done} onChange={() => {}} onColor='#00d75d' />
    </SubTaskBox>
  );
};

export default SubTask;

const SubTaskBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  margin-bottom: 2px;
  background-color: #ffffff21;
  &:hover {
    background-color: #ffffff33;
  }
`;
