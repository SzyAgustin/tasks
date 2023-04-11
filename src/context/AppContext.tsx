import React, { createContext, useState, useCallback } from 'react';
import { ITask, getTasks } from '../services/TaskService';
import { getDocs } from 'firebase/firestore';
import { dailyFirstExecutionCleanUp } from './LastExecutionHelper';
import { getSortedTasks, saveTasksSorting } from './SortingHelper';

interface IAppState {
  darkMode: boolean;
  setDarkMode: (x: boolean) => void;
  searchValue: string;
  setSearchValue: (x: string) => void;
  loadingTasks: boolean;
  setLoadingTasks: (x: boolean) => void;
  todayTasks: ITask[];
  setTodayTasks: (x: ITask[]) => void;
  isAddingTask: boolean;
  setIsAddingTask: (x: boolean) => void;
  isEditingTask: boolean;
  setIsEditingTask: (x: boolean) => void;
  getAllTasks: () => void;
  taskToEdit?: ITask;
  setTaskToEdit: (task: ITask | undefined) => void;
  setTodayTasksWithSorting: (x: ITask[]) => void;
}

const initialState: IAppState = {
  darkMode: true,
  setDarkMode: (x: boolean) => {},
  loadingTasks: true,
  setLoadingTasks: (x: boolean) => {},
  isAddingTask: false,
  setIsAddingTask: (x: boolean) => {},
  isEditingTask: false,
  setIsEditingTask: (x: boolean) => {},
  getAllTasks: () => {},
  todayTasks: [],
  setTodayTasks: () => {},
  searchValue: '',
  setSearchValue: (x: string) => {},
  taskToEdit: undefined,
  setTaskToEdit: (task: ITask | undefined) => {},
  setTodayTasksWithSorting: (x: ITask[]) => {},
};

interface AppProviderProps {
  children: any;
}

export const AppContext = createContext<IAppState>(initialState);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [taskToEdit, setTaskToEdit] = useState<ITask | undefined>();

  const setTodayTasksWithSorting = (tasks: ITask[]) => {
    setTodayTasks(tasks);
    saveTasksSorting(tasks);
  };

  const getAllTasks = useCallback(async () => {
    setLoadingTasks(true);
    await dailyFirstExecutionCleanUp();
    const allTasksSnapshot = await getDocs(getTasks());
    const todayTasks = allTasksSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ITask)
    );
    const todayTasksSorted = await getSortedTasks(todayTasks);
    setTodayTasks(todayTasksSorted);
    setLoadingTasks(false);
  }, []);

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
        searchValue,
        setSearchValue,
        isEditingTask,
        setIsEditingTask,
        taskToEdit,
        setTaskToEdit,
        setTodayTasksWithSorting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
