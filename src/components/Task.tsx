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
        <Title onClick={handleClick}>
          {title}{' '}
          {isPeriodic && <StyledRiRepeatFill width={'100px'} color='#00d75d' />}
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

const Title = styled.div`
  width: calc(80%);
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
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
  width: 20px;
  min-width: 20px;
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
`;

interface AccordionIconProps {
  isShowingSubTasks: boolean;
}

const AccordionIcon = styled(MdOutlineArrowForwardIos)<AccordionIconProps>`
  transition: 0.2s;
  ${(p) => (p.isShowingSubTasks ? 'transform: rotate(90deg);' : '')};
`;

const AccordionIconBox = styled.div`
  width: 10%;
  display: flex;
  justify-content: end;

  &:hover {
    color: #bbbbbb;
  }
`;

// const SwitchBox = styled.div`
//   width: 10%;
// `;

const TaskBoxContainer = styled.div<TaskBoxProps>`
  &:hover {
    box-shadow: 0px 0px 5px 0px
      ${(p) => (p.darkMode ? '#ffffffcb' : '#006baee4')};
  }
`;
