import React, { useState, useContext } from 'react';
import {
  IFormTask,
  ILocalTask,
  ISubTask,
  addTask,
  deleteTask,
  editTask,
} from '../../services/TaskService';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Form, Formik, FormikProps } from 'formik';
import Input from '../form/Input';
import CheckBox from '../form/CheckBox';
import ModalButton from '../ModalButton';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import PeriodicSelection from './PeriodicSelection';
import Tabs from './Tabs';

interface AddEditFormProps {
  closeModal: () => void;
}

const AddEditForm = ({ closeModal }: AddEditFormProps) => {
  const {
    darkMode,
    setTodayTasks,
    todayTasks,
    taskToEdit,
    setTodayTasksWithSorting,
    setSearchValue,
  } = useContext(AppContext);
  const [isIndividualTask, setIsIndividualTask] = useState<boolean>(true);
  const [subTasks, setSubTasks] = useState<ISubTask[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [periodicSelection, setPeriodicSelection] = useState<number[]>(
    taskToEdit?.periodicSelection || []
  );
  const { user } = useContext(UserContext);

  const initialValues: IFormTask = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    done: taskToEdit?.done || false,
    isPeriodic: taskToEdit?.isPeriodic || false,
    userId: user?.uid!,
    periodicSelection: [],
    subTask: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Obligatorio'),
  });

  const timeoutClose = () => {
    setTimeout(() => {
      setDeleting(false);
      setDeleted(false);
      setLoading(false);
      setSuccess(false);
      closeModal();
    }, 1000);
  };

  const getCurrentTask = (task: ILocalTask) => {
    return {
      ...task,
      periodicSelection,
    };
  };

  const onSubmit = (task: IFormTask) => {
    const currentTask = getCurrentTask(task);
    setSearchValue('');
    setLoading(true);
    taskToEdit
      ? handleEdit(taskToEdit.id, currentTask)
      : handleAdd(currentTask);
  };

  const handleAddSubTask = (formik: FormikProps<IFormTask>) => {
    const subTask: ISubTask = {
      id: '1', ///
      title: formik.values.subTask,
      done: false,
    };
    subTasks ? setSubTasks([...subTasks, subTask]) : setSubTasks([subTask]);
    formik.setValues({ ...formik.values, subTask: '' });
  };

  const handleTabChange = (formik: FormikProps<IFormTask>, value: boolean) => {
    formik.resetForm();
    setPeriodicSelection([]);
    setSubTasks(undefined);
    setIsIndividualTask(value);
  };

  const handleEdit = (id: string, task: ILocalTask) => {
    editTask(id, task)
      .then(() => {
        setSuccess(true);
        const tasks = todayTasks.map((taskInList) =>
          taskInList.id === id ? { ...task, id } : taskInList
        );
        setTodayTasks(tasks);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        console.log(err); //TODO: agregar toaster para mostrar este error
      })
      .finally(() => {
        timeoutClose();
      });
  };

  const handleAdd = (task: ILocalTask) => {
    addTask(task)
      .then((res) => {
        setSuccess(true);
        const isForToday =
          !task.isPeriodic ||
          task.periodicSelection?.length === 0 ||
          task.periodicSelection?.includes(new Date().getDay());
        isForToday &&
          setTodayTasksWithSorting([...todayTasks, { ...task, id: res.id }]);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
      })
      .finally(() => {
        timeoutClose();
      });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteTask(taskToEdit!.id)
      .then(() => {
        setDeleted(true);
        setTodayTasksWithSorting(
          todayTasks.filter((task) => task.id !== taskToEdit!.id)
        );
      })
      .catch((err) => {
        setDeleted(false);
        setDeleting(false);
        console.log(err); //Todo: manejar error
      })
      .finally(() => {
        timeoutClose();
      });
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <Tabs
              firstOption={isIndividualTask}
              setFirstOption={(value: boolean) =>
                handleTabChange(formik, value)
              }
            />
            <FormInputsBox>
              <Input name='title' label='Titulo' />
              {isIndividualTask && (
                <Input name='description' label='Descripcion' />
              )}
              {taskToEdit && isIndividualTask && (
                <CheckBox name='done' label='Completada' />
              )}
              {isIndividualTask && (
                <CheckBox name='isPeriodic' label='Es periodica?' />
              )}
              {!isIndividualTask && (
                <AddSubTaskBox>
                  <SubTaskInputBox>
                    <Input name='subTask' label='Sub Tarea' />
                  </SubTaskInputBox>
                  <AddButton
                    darkMode={darkMode}
                    onClick={() => handleAddSubTask(formik)}
                  >
                    {' '}
                    +{' '}
                  </AddButton>
                </AddSubTaskBox>
              )}
              {!isIndividualTask && (
                <SubTasks>
                  {subTasks?.map((subTask) => (
                    <p>{subTask.title}</p>
                  ))}
                </SubTasks>
              )}
              <SpaceDiv>
                {formik.values.isPeriodic && (
                  <PeriodicSelection
                    periodicSelection={periodicSelection}
                    setPeriodicSelection={setPeriodicSelection}
                  />
                )}
              </SpaceDiv>
            </FormInputsBox>
            <FormFooter darkMode={darkMode}>
              <ModalButton loading={loading} success={success} />
              {taskToEdit && (
                <ModalButton
                  loading={deleting}
                  success={deleted}
                  onClick={handleDelete}
                  isDeletion
                />
              )}
            </FormFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditForm;

interface DarkModeProps {
  darkMode: boolean;
}

const FormFooter = styled.div<DarkModeProps>`
  border-top: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 20px 0;
  display: flex;
`;

const SpaceDiv = styled.div`
  height: 50px;
`;

const FormInputsBox = styled.div`
  box-sizing: border-box;
  padding: 10px;
  min-height: 310px;
`;

const AddSubTaskBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTaskInputBox = styled.div`
  width: 90%;
`;

const SubTasks = styled.div`
  height: 150px;
  background-color: gray;
  overflow-y: scroll;
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
