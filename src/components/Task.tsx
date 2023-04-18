import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { ITask, getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';
import { AppContext } from '../context/AppContext';
import { RiRepeatFill } from 'react-icons/ri';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import SubTask from './SubTask';

interface TaskProps {
  task: ITask;
}

var dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Task = ({ task }: TaskProps) => {
  const { id, title, done, isPeriodic, periodicSelection, subTasks } = task;
  const {
    darkMode,
    todayTasks,
    setTodayTasks,
    setIsAddingTask,
    setTaskToEdit,
  } = useContext(AppContext);
  const [loadingTaskChange, setLoadingTaskChange] = useState<boolean>(false);
  const [isShowingSubTasks, setIsShowingSubTasks] = useState<boolean>(false);

  const getPeriodicString = () => {
    return periodicSelection
      ? periodicSelection
          .sort()
          .map((day) => dayOfWeek[day])
          .join(', ')
      : '';
  };

  const setTask = (id: string, value: boolean) => {
    setLoadingTaskChange(true);
    const taskRef = getTask(id);
    updateDoc(taskRef, {
      done: value,
    })
      .then(() => {
        const tasks = todayTasks.map((task) =>
          task.id === id ? { ...task, done: value } : task
        );
        setTodayTasks(tasks);
      })
      .catch((err) => {
        console.log(err); //TODO: agregar toaster para mostrar este error
      })
      .finally(() => {
        setLoadingTaskChange(false);
      });
  };

  const handleClick = () => {
    setTaskToEdit(todayTasks.find((task) => task.id === id));
    setIsAddingTask(true);
  };

  return (
    <TaskBoxContainer darkMode={darkMode}>
      <TaskBox darkMode={darkMode}>
        <Title style={{ width: '90%' }} onClick={handleClick}>
          {title} {isPeriodic && <StyledRiRepeatFill color='#00d75d' />}
          <PeriodicString>
            {isPeriodic &&
              periodicSelection &&
              periodicSelection.length > 0 &&
              `(${getPeriodicString()})`}
          </PeriodicString>
        </Title>
        {subTasks.length === 0 ? (
          <Switch
            onChange={() => setTask(id, !done)}
            checked={done}
            onColor='#00d75d'
            disabled={loadingTaskChange}
          />
        ) : (
          <AccordionIconBox
            onClick={() => setIsShowingSubTasks(!isShowingSubTasks)}
          >
            <AccordionIcon isShowingSubTasks={isShowingSubTasks} />
          </AccordionIconBox>
        )}
      </TaskBox>
      <SubTasksBox darkMode={darkMode} isOpen={isShowingSubTasks}>
        {isShowingSubTasks &&
          subTasks.map((subTask) => (
            <SubTask subTask={subTask} taskId={id} allSubTasks={subTasks} />
          ))}
      </SubTasksBox>
    </TaskBoxContainer>
  );
};

export default Task;

interface TaskBoxProps {
  darkMode: boolean;
}

const Title = styled.p`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

export const TaskBox = styled.div<TaskBoxProps>`
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 0.5em 1em;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
`;

const StyledRiRepeatFill = styled(RiRepeatFill)`
  margin-bottom: -3px;
  margin-left: 5px;
`;

const PeriodicString = styled.p`
  margin-left: 5px;
  font-style: oblique;
`;

interface SubTasksBoxProps {
  isOpen: boolean;
  darkMode: boolean;
}

const SubTasksBox = styled.div<SubTasksBoxProps>`
  transition: 0.2s;
  background-color: ${(p) => (p.darkMode ? '#424960' : '#006bae32')};
  /* height: ${(p) => (p.isOpen ? '100px' : '0px')}; */
  /* max-height: ${(p) => (p.isOpen ? '100px' : '0px')}; */
  /* min-height: ${(p) => (p.isOpen ? '100px' : '0px')}; */
  /* overflow-y: scroll; */
  /* ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: ${(p) => (p.darkMode ? 'rgb(4, 34, 78)' : 'white')};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(p) => (p.darkMode ? '#bbbbbb' : 'rgb(9, 46, 101)')};
  } */
`;

interface AccordionIconProps {
  isShowingSubTasks: boolean;
}

const AccordionIcon = styled(MdOutlineArrowForwardIos)<AccordionIconProps>`
  transition: 0.2s;
  ${(p) => (p.isShowingSubTasks ? 'transform: rotate(90deg);' : '')};
`;

const AccordionIconBox = styled.div`
  width: 5%;
  display: flex;
  justify-content: end;

  &:hover {
    color: #bbbbbb;
  }
`;

const TaskBoxContainer = styled.div<TaskBoxProps>`
  &:hover {
    box-shadow: 0px 0px 5px 0px
      ${(p) => (p.darkMode ? '#ffffffcb' : '#006baee4')};
  }
`;
