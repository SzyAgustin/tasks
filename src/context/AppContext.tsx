import React, { createContext, useState } from 'react';
import { ITask, cleanDoneTasks, getTasks } from '../services/TaskService';
import {
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getLastExecution } from '../services/FirstExecutionService';

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
  setTaskToEditWithId: (id: string) => void;
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
  setTaskToEditWithId: (id: string) => {},
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

  const setTaskToEditWithId = (id: string | undefined) => {
    if (!id) {
      setTaskToEdit(undefined);
      return;
    }
    setTaskToEdit(todayTasks.find((task) => task.id === id));
  };

  const getOrderedTasks = () => {
    todayTasks.sort((a, b) => (a.title < b.title ? -1 : 1)); //TODO: change this and create way to customize ordering the tasks
    // const doneTasks = todayTasks.filter((task) => task.done);
    // const undoneTasks = todayTasks.filter((task) => !task.done);

    // const tasks = undoneTasks.concat(doneTasks);

    const orderedTasksSearched = searchValue
      ? todayTasks.filter((task) =>
          task.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : todayTasks;

    return orderedTasksSearched;
  };

  const getTodaysDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const dailyFirstExecutionCleanUp = async () => {
    const lastExecutionRef = getLastExecution('1'); //TODO: Send userid
    const lastExecutionSnap = await getDoc(lastExecutionRef);

    if (
      lastExecutionSnap.exists() &&
      lastExecutionSnap.data().lastExecution !== getTodaysDate()
    ) {
      await cleanDoneTasks();
    }
    setLastExecution(lastExecutionRef);
  };

  const setLastExecution = (
    lastExecutionRef: DocumentReference<DocumentData>
  ) => {
    setDoc(lastExecutionRef, {
      lastExecution: getTodaysDate(),
      userId: '1', //TODO, change this when authentication is developed
    })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err); //TODO: agregar toaster para mostrar este error
      });
  };

  const getAllTasks = async () => {
    setLoadingTasks(true);
    await dailyFirstExecutionCleanUp();
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
        todayTasks: getOrderedTasks(),
        setTodayTasks,
        loadingTasks,
        setLoadingTasks,
        searchValue,
        setSearchValue,
        isEditingTask,
        setIsEditingTask,
        taskToEdit,
        setTaskToEdit,
        setTaskToEditWithId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
