import React, { createContext, ReactNode, useMemo, useState } from 'react';

export interface IUser {
  id: string;
  name: string;
  index: number;
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
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>; // setUsers 함수 타입 수정
  resetUsers: () => void;
}
const defaultUserContext: IUserOptionContext = {
  users: [],
  setUsers: () => {},
  resetUsers: () => {},
};

export const UserContext = createContext<IUserOptionContext>(defaultUserContext); // 기본값을 null로 설정

export const UserProvider = (props: IUserContextProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const resetUsers = () => {
    setUsers([]);
  };

  const contextValue = useMemo(() => ({ users, setUsers, resetUsers }), [users, setUsers]);

  return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};
