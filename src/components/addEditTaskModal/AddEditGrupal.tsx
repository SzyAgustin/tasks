import React, { useContext } from 'react';
import styled from 'styled-components';
import Input from '../form/Input';
import { AppContext } from '../../context/AppContext';
import SubTaskForm from './SubTaskForm';
import { FormikProps } from 'formik';
import { IFormTask, ISubTask } from '../../services/TaskService';

interface AddEditGrupalProps {
  formik: FormikProps<IFormTask>;
  subTasks: ISubTask[];
  handleAddSubTask: (formik: FormikProps<IFormTask>) => void;
  handleDeleteTask: (id: string) => void;
}

const AddEditGrupal = ({
  formik,
  subTasks,
  handleAddSubTask,
  handleDeleteTask,
}: AddEditGrupalProps) => {
  const { darkMode } = useContext(AppContext);
  return (
    <>
      <AddSubTaskBox>
        <SubTaskInputBox>
          <Input name='subTask' label='Tarea' />
        </SubTaskInputBox>
        <AddButton
          type='button'
          darkMode={darkMode}
          onClick={() => handleAddSubTask(formik)}
        >
          +
        </AddButton>
      </AddSubTaskBox>
      <SubTasks darkMode={darkMode}>
        {subTasks.length > 0 ? (
          subTasks.map((subTask) => (
            <SubTaskForm
              key={subTask.id}
              subTask={subTask}
              deleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <SubTasksEmpty>Agrega al menos una Sub Tarea.</SubTasksEmpty>
        )}
      </SubTasks>
    </>
  );
};

export default AddEditGrupal;

interface DarkModeProps {
  darkMode: boolean;
}

const AddSubTaskBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTaskInputBox = styled.div`
  width: calc(100% - 60px);
`;

const SubTasks = styled.div<DarkModeProps>`
  height: 120px;
  background-color: ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  overflow-y: scroll;
  ::-webkit-scrollbar {
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
  }
`;

const AddButton = styled.button<DarkModeProps>`
  transition: 0.4s;
  width: 40px;
  height: 40px;
  border: 0px;
  font-size: 30px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.darkMode ? '#2862b9' : '#2463c1')};
  color: white;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: ${(p) => (p.darkMode ? '#2862b9ce' : '#1364dece')};
  }
`;

const SubTasksEmpty = styled.p`
  padding: 10px 20px;
  font-style: oblique;
`;
