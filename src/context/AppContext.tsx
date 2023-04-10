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
import { getTasksUserSorting } from '../services/SortingService';

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
  setTaskToEditWithId: (id: string) => {},
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

  const setTaskToEditWithId = (id: string | undefined) => {
    if (!id) {
      setTaskToEdit(undefined);
      return;
    }
    setTaskToEdit(todayTasks.find((task) => task.id === id));
  };

  const setTodayTasksWithSorting = (tasks: ITask[]) => {
    console.log('setTodayTasksWithSorting', tasks);
    setTodayTasks(tasks);
    saveTasksSorting(tasks);
  };

  const saveTasksSorting = (tasks: ITask[]) => {
    const ids = tasks.map((task) => task.id);
    const tasksUserSortingRef = getTasksUserSorting('1'); //todo: send user id
    setDoc(tasksUserSortingRef, {
      sortedList: ids,
      userId: '1', //TODO, change this when authentication is developed
    })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err); //TODO: agregar toaster para mostrar este error
      });
  };

  const getOrderedTasks = async (tasks: ITask[]) => {
    const tasksUserSortingRef = getTasksUserSorting('1');
    const tasksUserSortingSnap = await getDoc(tasksUserSortingRef);
    console.log(tasksUserSortingSnap.data());
    if (tasksUserSortingSnap.exists()) {
      const sorted = tasksUserSortingSnap
        .data()
        .sortedList.map((id: string) => tasks.find((task) => task.id === id));
      console.log('first sort', sorted);
      return sorted.filter((task: ITask) => task !== undefined);
    } else {
      saveTasksSorting(tasks);
    }

    return todayTasks;
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
    getDocs(query).then(async (querySnapshot) => {
      const todayTasks = await getOrderedTasks(
        querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ITask)
        )
      );
      console.log('return from getOrderedTasks', todayTasks);
      setTodayTasks(todayTasks);
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
        searchValue,
        setSearchValue,
        isEditingTask,
        setIsEditingTask,
        taskToEdit,
        setTaskToEdit,
        setTaskToEditWithId,
        setTodayTasksWithSorting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
