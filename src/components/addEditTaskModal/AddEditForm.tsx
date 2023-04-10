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

interface AddEditFormProps {
  closeModal: () => void;
}

const AddEditForm = ({ closeModal }: AddEditFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    darkMode,
    setTodayTasks,
    todayTasks,
    taskToEdit,
    setTodayTasksWithSorting,
  } = useContext(AppContext);
  const initialValues = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    done: taskToEdit?.done || false,
    isPeriodic: taskToEdit?.isPeriodic || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
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
    setLoading(true);
    taskToEdit ? handleEdit(taskToEdit.id, task) : handleAdd(task);
  };

  const handleAdd = (task: ILocalTask) => {
    addTask(task)
      .then((res) => {
        setSuccess(true);
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
      {(formik) => (
        <Form>
          <Input name='title' label='Titulo' />
          <Input name='description' label='Descripcion' />
          {taskToEdit && <CheckBox name='done' label='Completada' />}
          <CheckBox name='isPeriodic' label='Es periodica?' />
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
      )}
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
