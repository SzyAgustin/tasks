import React, { createContext, useEffect, useState } from 'react';

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
}

interface IUserState {
  user?: IUser;
  setUser?: any;
}

const initialState: IUserState = {};

interface UserProviderProps {
  children: any;
}

export const UserContext = createContext<IUserState>(initialState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const getStoredUser = () => {
    const userStored: string | null = localStorage.getItem('tasks-user');
    if (!userStored) return undefined;
    const userS = userStored.split(';');
    return {
      displayName: userS[0],
      email: userS[1],
      uid: userS[2],
    };
  };
  const [user, setUser] = useState<IUser | undefined>(getStoredUser());

  useEffect(() => {
    const userStored: string | null = localStorage.getItem('tasks-user');
    if (userStored) {
      const userS = userStored.split(';');
      setUser({
        displayName: userS[0],
        email: userS[1],
        uid: userS[2],
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
