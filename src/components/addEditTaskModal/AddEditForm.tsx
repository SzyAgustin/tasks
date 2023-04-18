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
import ModalButton from '../ModalButton';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';
import Tabs from './Tabs';
import { v4 as uuidv4 } from 'uuid';
import AddEditIndividual from './AddEditIndividual';
import AddEditGrupal from './AddEditGrupal';

interface AddEditFormProps {
  closeModal: () => void;
}

const AddEditForm = ({ closeModal }: AddEditFormProps) => {
  ///// context /////
  const {
    darkMode,
    setTodayTasks,
    todayTasks,
    taskToEdit,
    setTodayTasksWithSorting,
    setSearchValue,
  } = useContext(AppContext);
  const { user } = useContext(UserContext);

  ///// state /////
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isIndividualTask, setIsIndividualTask] = useState<boolean>(
    taskToEdit && taskToEdit.subTasks.length > 0 ? false : true
  );
  const [subTasks, setSubTasks] = useState<ISubTask[]>(
    taskToEdit ? taskToEdit.subTasks : []
  );
  const [periodicSelection, setPeriodicSelection] = useState<number[]>(
    taskToEdit?.periodicSelection || []
  );

  const initialValues: IFormTask = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    done: taskToEdit?.done || false,
    isPeriodic: taskToEdit?.isPeriodic || false,
    userId: user?.uid!,
    periodicSelection: taskToEdit?.periodicSelection || [],
    subTask: '',
    subTasks: taskToEdit ? taskToEdit.subTasks : [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Obligatorio'),
  });

  ///// functions /////
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
      subTasks,
    } as ILocalTask;
  };

  ///// handlers /////
  const onSubmit = (task: IFormTask) => {
    if (!isIndividualTask && subTasks.length === 0) return;
    const currentTask = getCurrentTask(task);
    setSearchValue('');
    setLoading(true);
    taskToEdit
      ? handleEdit(taskToEdit.id, currentTask)
      : handleAdd(currentTask);
  };

  const handleAddSubTask = (formik: FormikProps<IFormTask>) => {
    if (formik.values.subTask === '') return;
    const subTask: ISubTask = {
      id: uuidv4(),
      title: formik.values.subTask,
      done: false,
    };
    subTasks ? setSubTasks([...subTasks, subTask]) : setSubTasks([subTask]);
    formik.setValues({ ...formik.values, subTask: '' });
  };

  const handleTabChange = (formik: FormikProps<IFormTask>, value: boolean) => {
    formik.resetForm();
    setPeriodicSelection([]);
    setSubTasks([]);
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

  const handleDeleteTask = (id: string) => {
    const newSubTasks = subTasks.filter((subTask) => subTask.id !== id);
    setSubTasks(newSubTasks);
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
            {!taskToEdit && (
              <Tabs
                firstOption={isIndividualTask}
                setFirstOption={(value: boolean) =>
                  handleTabChange(formik, value)
                }
              />
            )}
            <FormInputsBox>
              <Input
                name='title'
                label={isIndividualTask ? 'Titulo' : 'Titulo del grupo'}
              />
              {isIndividualTask && (
                <AddEditIndividual
                  formik={formik}
                  taskToEdit={taskToEdit}
                  periodicSelection={periodicSelection}
                  setPeriodicSelection={setPeriodicSelection}
                />
              )}
              {!isIndividualTask && (
                <AddEditGrupal
                  formik={formik}
                  subTasks={subTasks}
                  handleAddSubTask={handleAddSubTask}
                  handleDeleteTask={handleDeleteTask}
                />
              )}
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

const FormInputsBox = styled.div`
  box-sizing: border-box;
  padding: 10px;
  min-height: 310px;
`;
