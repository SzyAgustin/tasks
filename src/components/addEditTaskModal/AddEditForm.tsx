import React, { useState, useContext } from 'react';
import {
  ILocalTask,
  addTask,
  deleteTask,
  editTask,
} from '../../services/TaskService';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import Input from '../form/Input';
import CheckBox from '../form/CheckBox';
import ModalButton from '../ModalButton';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import PeriodicSelection from './PeriodicSelection';
import { AddButton } from '../AddTaskButton';

interface AddEditFormProps {
  closeModal: () => void;
  isIndividualTask: boolean;
}

const AddEditForm = ({ closeModal, isIndividualTask }: AddEditFormProps) => {
  const {
    darkMode,
    setTodayTasks,
    todayTasks,
    taskToEdit,
    setTodayTasksWithSorting,
    setSearchValue,
  } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [periodicSelection, setPeriodicSelection] = useState<number[]>(
    taskToEdit?.periodicSelection || []
  );
  const { user } = useContext(UserContext);
  const initialValues = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    done: taskToEdit?.done || false,
    isPeriodic: taskToEdit?.isPeriodic || false,
    userId: user?.uid!,
    periodicSelection: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Obligatorio'),
  });

  const timeoutClose = () => {
    setTimeout(() => {
      setDeleting(false);
      setDeleted(false);
      setLoading(false);
      closeModal();
      setSuccess(false);
    }, 1000);
  };

  const getCurrentTask = (task: ILocalTask) => {
    return {
      ...task,
      periodicSelection,
    };
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

  const onSubmit = (task: ILocalTask) => {
    const currentTask = getCurrentTask(task);
    setSearchValue('');
    setLoading(true);
    taskToEdit
      ? handleEdit(taskToEdit.id, currentTask)
      : handleAdd(currentTask);
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
                    <Input name='subtask' label='Sub Tarea' />
                  </SubTaskInputBox>
                  <AddSubTaskButton darkMode={darkMode}> + </AddSubTaskButton>
                </AddSubTaskBox>
              )}
              {!isIndividualTask && <SubTasks></SubTasks>}
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

const AddSubTaskButton = styled(AddButton)`
  margin-top: 15px;
`;

const SubTaskInputBox = styled.div`
  width: 90%;
`;

const SubTasks = styled.div`
  height: 150px;
  background-color: gray;
`;
