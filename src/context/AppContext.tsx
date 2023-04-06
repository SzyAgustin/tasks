import React, { createContext, useState } from 'react';
import { ITask, getTask, getTasks } from '../services/TaskService';
import { deleteDoc, getDocs } from 'firebase/firestore';

interface IAppState {
  darkMode: boolean;
  setDarkMode: (x: boolean) => void;
  loadingTasks: boolean;
  setLoadingTasks: (x: boolean) => void;
  todayTasks: ITask[];
  setTodayTasks: (x: ITask[]) => void;
  isAddingTask: boolean;
  setIsAddingTask: (x: boolean) => void;
  getAllTasks: () => void;
  handleDelete: (id: string) => void;
}

const initialState: IAppState = {
  darkMode: true,
  setDarkMode: (x: boolean) => {},
  loadingTasks: true,
  setLoadingTasks: (x: boolean) => {},
  isAddingTask: false,
  setIsAddingTask: (x: boolean) => {},
  getAllTasks: () => {},
  todayTasks: [],
  setTodayTasks: () => {},
  handleDelete: () => {},
};

interface AppProviderProps {
  children: any;
}

export const AppContext = createContext<IAppState>(initialState);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    deleteDoc(getTask(id))
      .then(() => {
        setTodayTasks(todayTasks.filter((task) => task.id !== id));
      })
      .catch((err) => {
        console.log(err); //Todo: manejar error
      });
  };

  const getAllTasks = () => {
    setLoadingTasks(true);
    const query = getTasks();
    getDocs(query).then((querySnapshot) => {
      setTodayTasks(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as ITask;
        })
      );
      setLoadingTasks(false);
    });
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isAddingTask,
        setIsAddingTask,
        getAllTasks,
        todayTasks,
        setTodayTasks,
        loadingTasks,
        setLoadingTasks,
        handleDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
