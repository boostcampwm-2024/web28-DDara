import React, { createContext, ReactNode, useMemo, useState } from 'react';

export interface IUser {
  id: number;
  name: string;
  start_location: {
    lat: number;
    lng: number;
  };
  end_location: {
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
}

const defaultUserContext: IUserOptionContext = {
  users: [],
  setUsers: () => {},
};

export const UserContext = createContext<IUserOptionContext>(defaultUserContext);

export const UserProvider = (props: IUserContextProps) => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      name: '사용자1',
      start_location: { lat: 37.5665, lng: 126.978 },
      end_location: { lat: 35.1796, lng: 129.0756 },
      path: [
        { lat: 37.5665, lng: 126.978 },
        { lat: 36.5, lng: 127.5 },
        { lat: 35.1796, lng: 129.0756 },
      ],
      marker_style: { color: 'blue' },
    },
  ]);
  const contextValue = useMemo(() => ({ users, setUsers }), [users, setUsers]);

  return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};
