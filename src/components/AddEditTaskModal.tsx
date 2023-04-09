import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../context/AppContext';
import { Form, Formik } from 'formik';
import Input from './form/Input';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from './Button';
import { ILocalTask, addTask, getTask } from '../services/TaskService';
import { TailSpin } from 'react-loader-spinner';
import { MdDone } from 'react-icons/md';
import TransitionIcons from './TransitionIcons';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import ModalButton from './ModalButton';

const AddEditTaskModal = () => {
  const {
    darkMode,
    isAddingTask,
    setIsAddingTask,
    isEditingTask,
    setIsEditingTask,
    setTodayTasks,
    todayTasks,
    taskToEdit,
    setTaskToEdit,
  } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const closeModal = () => {
    setIsAddingTask(false);
    setIsEditingTask(false);
    setTaskToEdit(undefined);
  };

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
    setLoading(true);
    const taskRef = getTask(id);
    updateDoc(taskRef, {
      title: task.title,
      description: task.description,
      done: task.done,
    })
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
    console.log('onsumbit');
    if (taskToEdit) {
      handleEdit(taskToEdit.id, task);
    } else {
      handleAdd(task);
    }
  };

  const handleAdd = (task: ILocalTask) => {
    setLoading(true);
    addTask(task)
      .then((res) => {
        setSuccess(true);
        setTodayTasks([...todayTasks, { ...task, id: res.id }]);
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
    deleteDoc(getTask(taskToEdit!.id))
      .then(() => {
        setDeleted(true);
        setTodayTasks(todayTasks.filter((task) => task.id !== taskToEdit!.id));
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

  const initialValues = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    done: taskToEdit?.done || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
  });

  return (
    <Modal
      isOpen={isAddingTask || isEditingTask}
      onRequestClose={closeModal}
      style={customStyles(darkMode)}
    >
      <ModalBox darkMode={darkMode}>
        <TitleBox darkMode={darkMode}>
          {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
        </TitleBox>
        <FormBox>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <Input name='title' label='Titulo' darkMode={darkMode} />
                <Input
                  name='description'
                  label='Descripcion'
                  darkMode={darkMode}
                />
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
        </FormBox>
      </ModalBox>
    </Modal>
  );
};

export default AddEditTaskModal;

interface DarkModeProps {
  darkMode: boolean;
}

const TitleBox = styled.div<DarkModeProps>`
  border-bottom: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-size: 30px;
`;

const ModalBox = styled.div<DarkModeProps>`
  width: 100%;
  margin: 0 auto;
  min-height: 50vh;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
`;

const FormBox = styled.div`
  width: 40vw;
`;

const FormFooter = styled.div<DarkModeProps>`
  border-top: 1px solid ${(p) => (p.darkMode ? '#ffffff22' : '#006bae32')};
  padding: 20px 0;
  display: flex;
`;

const customStyles = (darkMode: boolean) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: darkMode ? 'rgb(4, 34, 78)' : 'white',
    border: '0',
    boxShadow: darkMode
      ? '0px 0px 5px 0px rgb(0, 0, 0)'
      : '0px 0px 5px 0px rgb(0, 0, 0, 120)',
    //   -webkit-box-shadow: ${(p) =>
    //     p.darkMode
    //       ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
    //       : '0px 0px 9px 0px #04224e'};
    //   -moz-box-shadow: ${(p) =>
    //     p.darkMode
    //       ? '0px 0px 9px 0px rgba(0, 0, 0, 0.85)'
    //       : '0px 0px 9px 0px #04224e'};
  },
  overlay: {
    background: '#00000099',
  },
});
