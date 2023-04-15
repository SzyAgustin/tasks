import React, { createContext, useState, useCallback, useContext } from 'react';
import { ITask, getAllTasks, getJustTodayTasks } from '../services/TaskService';
import { dailyFirstExecutionCleanUp } from './LastExecutionHelper';
import { saveTasksSorting, sortUserTasks } from './SortingHelper';
import { UserContext } from './UserContext';

interface IAppState {
  darkMode: boolean;
  setDarkMode: (x: boolean) => void;
  justTodayTasks: boolean;
  setJustTodayTasks: (x: boolean) => void;
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
  getTasksSorted: () => void;
  taskToEdit?: ITask;
  setTaskToEdit: (task: ITask | undefined) => void;
  setTodayTasksWithSorting: (x: ITask[]) => void;
}

const initialState: IAppState = {
  darkMode: true,
  setDarkMode: (x: boolean) => {},
  justTodayTasks: true,
  setJustTodayTasks: (x: boolean) => {},
  loadingTasks: true,
  setLoadingTasks: (x: boolean) => {},
  isAddingTask: false,
  setIsAddingTask: (x: boolean) => {},
  isEditingTask: false,
  setIsEditingTask: (x: boolean) => {},
  getTasksSorted: () => {},
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
  const [justTodayTasks, setJustTodayTasks] = useState<boolean>(true);

  const setDarkModeStorage = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem('tasks-darkmode', `${value}`);
  };

  const setTodayTasksWithSorting = (tasks: ITask[]) => {
    setTodayTasks(tasks);
    saveTasksSorting(tasks, user?.uid!);
  };

  const getTasksSorted = useCallback(async () => {
    setLoadingTasks(true);
    await dailyFirstExecutionCleanUp(user?.uid!);
    const tasks = justTodayTasks
      ? await getJustTodayTasks(user?.uid!)
      : await getAllTasks(user?.uid!);
    const tasksSorted = await sortUserTasks(tasks, user?.uid!);
    setTodayTasks(tasksSorted);
    setLoadingTasks(false);
  }, [user?.uid, justTodayTasks]);

  const todayTasksFiltered = () => {
    let tasksToReturn = todayTasks;
    tasksToReturn =
      searchValue !== ''
        ? tasksToReturn.filter((task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase())
          )
        : tasksToReturn;
    return tasksToReturn;
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode: setDarkModeStorage,
        isAddingTask,
        setIsAddingTask,
        getTasksSorted,
        todayTasks: todayTasksFiltered(),
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
        justTodayTasks,
        setJustTodayTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
