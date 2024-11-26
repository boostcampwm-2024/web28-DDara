import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { IUser } from './UserContext';

interface ICurrentUserContextProps {
  children: ReactNode;
}

interface ICurrentUserOptionContext {
  currentUser: IUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const defaultUserContext: ICurrentUserOptionContext = {
  currentUser: {
    id: 1,
    name: '사용자1',
    start_location: { title: '', lat: 0, lng: 0 },
    end_location: { title: '', lat: 0, lng: 0 },
    path: [],
    marker_style: { color: '' },
  },
  setCurrentUser: () => {},
};

export const CurrentUserContext = createContext<ICurrentUserOptionContext>(defaultUserContext);

export const CurrentUserProvider = (props: ICurrentUserContextProps) => {
  const [currentUser, setCurrentUser] = useState<IUser>(defaultUserContext.currentUser);
  const contextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );
  return (
    <CurrentUserContext.Provider value={contextValue}>{props.children}</CurrentUserContext.Provider>
  );
};
