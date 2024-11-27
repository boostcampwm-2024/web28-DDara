import React, { createContext, ReactNode, useMemo, useState } from 'react';

export interface IUser {
  id: number;
  name: string;
  start_location: {
    title: string;
    lat: number;
    lng: number;
  };
  end_location: {
    title: string;
    lat: number;
    lng: number;
  };
  path: { lat: number; lng: number }[]; // 경로가 여러 개일 수 있도록 수정
  marker_style: {
    color: string; // color는 일반적인 문자열로 수정
  };
}

interface IUserContextProps {
  children: ReactNode;
}

interface IUserOptionContext {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  resetUsers: () => void;
}

const defaultUserContext: IUserOptionContext = {
  users: [],
  setUsers: () => {},
  resetUsers: () => {},
};

export const UserContext = createContext<IUserOptionContext>(defaultUserContext);

export const UserProvider = (props: IUserContextProps) => {
  const defaultUsers: IUser[] = [
    {
      id: 1,
      name: '사용자1',
      start_location: { title: '', lat: 0, lng: 0 },
      end_location: { title: '', lat: 0, lng: 0 },
      path: [],
      marker_style: { color: '' },
    },
  ];

  const [users, setUsers] = useState<IUser[]>(defaultUsers);

  const resetUsers = () => {
    setUsers(defaultUsers);
  };
  const contextValue = useMemo(() => ({ users, setUsers, resetUsers }), [users, setUsers]);

  return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};
