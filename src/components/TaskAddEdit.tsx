import React, { useContext, useState } from 'react';
import { TaskBox } from './Task';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';
import { ILocalTask, addTask, getTask } from '../services/TaskService';
import { updateDoc } from 'firebase/firestore';

interface TaskAddEditProps {
  title?: string;
  id?: string;
  notEditMode?: () => void;
}

const TaskAddEdit = ({ title, id, notEditMode }: TaskAddEditProps) => {
  const { darkMode, setTodayTasks, todayTasks, setIsAddingTask } =
    useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title || '');

  const handleEdit = (id: string) => {
    const taskRef = getTask(id);
    if (title === value) {
      notEditMode?.();
      return;
    }
    updateDoc(taskRef, {
      title: value,
    })
      .then(() => {
        const tasks = todayTasks.map((task) =>
          task.id === id ? { ...task, title: value } : task
        );
        setTodayTasks(tasks);
      })
      .catch((err) => {
        console.log(err); //TODO: agregar toaster para mostrar este error
      })
      .finally(() => {
        notEditMode?.();
      });
  };

  const handleAdd = () => {
    const newTask: ILocalTask = {
      title: value,
      done: false,
    };
    addTask(newTask)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTodayTasks([...todayTasks, { ...newTask, id: res.id }]);
      })
      .catch((err) => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
        setIsAddingTask(false);
      });
  };

  const handleAddEdit = () => {
    setLoading(true);
    if (id) {
      handleEdit(id);
    } else {
      handleAdd();
    }
  };

  const getButtonText = () => {
    if (loading) return '-';
    if (id) return title === value ? 'Volver' : 'Modificar';
    return 'Agregar';
  };

  return (
    <TaskBox darkMode={darkMode}>
      <Input
        darkMode={darkMode}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='Nombre de la nueva tarea...'
        autoFocus
      ></Input>
      <AddButton
        darkMode={darkMode}
        loading={loading}
        disabled={value.length <= 5}
        onClick={handleAddEdit}
      >
        {getButtonText()}
      </AddButton>
    </TaskBox>
  );
};

export default TaskAddEdit;

const AddButton = styled.button<InputProps>`
  transition: 0.4s;
  padding: 4px 10px;
  border: 0px;
  border-radius: 4px;
  background-color: ${(p) =>
    p.disabled ? 'gray' : p.darkMode ? '#2862b9' : '#2463c1'};
  color: white;
  cursor: pointer;
  min-width: ${(p) => (p.loading ? '30px' : '100px')};

  &:hover {
    background-color: ${(p) =>
      p.disabled ? 'gray' : p.darkMode ? '#2862b9' : '#2463c1'};
  }
`;

interface InputProps {
  darkMode: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Input = styled.input<InputProps>`
  transition: 0.4s;
  font-size: 18px;
  width: 80%;
  background-color: transparent;
  border: 0px;
  color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
  font-style: oblique;
  font-weight: 700;

  &:focus-visible {
    border: transparent;
    outline: none;
  }

  &::placeholder {
    transition: 0.4s;
    color: ${(p) => (p.darkMode ? 'white' : 'rgb(4, 34, 78)')};
  }
`;
