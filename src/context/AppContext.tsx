import React, { createContext, useState } from 'react';

interface IAppState {
  darkMode: boolean;
  setDarkMode: (x: boolean) => void;
  isAddingTask: boolean;
  setIsAddingTask: (x: boolean) => void;
}

const initialState: IAppState = {
  darkMode: true,
  setDarkMode: (x: boolean) => {},
  isAddingTask: false,
  setIsAddingTask: (x: boolean) => {},
};

interface AppProviderProps {
  children: any;
}

export const AppContext = createContext<IAppState>(initialState);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ darkMode, setDarkMode, isAddingTask, setIsAddingTask }}
    >
      {children}
    </AppContext.Provider>
  );
};
