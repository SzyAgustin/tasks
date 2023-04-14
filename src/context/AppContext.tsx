import React, { createContext, useState, useCallback, useContext } from 'react';
import { ITask, getTasks, getTodayTasks } from '../services/TaskService';
import { getDocs } from 'firebase/firestore';
import { dailyFirstExecutionCleanUp } from './LastExecutionHelper';
import { saveTasksSorting, sortUserTasks } from './SortingHelper';
import { UserContext } from './UserContext';

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
  const { user } = useContext(UserContext);
  const darkModeStored: string | null = localStorage.getItem('tasks-darkmode');
  const [darkMode, setDarkMode] = useState<boolean>(
    darkModeStored === 'true' || darkModeStored === null
  );
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [taskToEdit, setTaskToEdit] = useState<ITask | undefined>();

  const setDarkModeStorage = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem('tasks-darkmode', `${value}`);
  };

  const setTodayTasksWithSorting = (tasks: ITask[]) => {
    setTodayTasks(tasks);
    saveTasksSorting(tasks, user?.uid!);
  };

  const getAllTasks = useCallback(async () => {
    setLoadingTasks(true);
    await dailyFirstExecutionCleanUp(user?.uid!);
    const todayTasks = await getTodayTasks(user?.uid!);
    const todayTasksSorted = await sortUserTasks(todayTasks, user?.uid!);
    setTodayTasks(todayTasksSorted);
    setLoadingTasks(false);
  }, [user?.uid]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode: setDarkModeStorage,
        isAddingTask,
        setIsAddingTask,
        getAllTasks,
        todayTasks:
          searchValue !== ''
            ? todayTasks.filter((task) =>
                task.title.toLowerCase().includes(searchValue.toLowerCase())
              )
            : todayTasks,
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
