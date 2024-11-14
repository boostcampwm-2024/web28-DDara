import { ReactNode, useState, createContext, useMemo } from 'react';
import { IHeaderOption } from '@/component/header/Header.tsx';

interface IHeaderOptionState {
  headerOption: IHeaderOption;
  setHeaderOption: React.Dispatch<React.SetStateAction<IHeaderOption>>;
}

const defaultHeaderOption: IHeaderOption = {
  title: '',
  leftButton: '',
  rightButton: '',
  subtitle: '',
};

export const HeaderContext = createContext<IHeaderOptionState>({
  headerOption: defaultHeaderOption,
  setHeaderOption: () => {},
});

interface ILayoutHeaderProviderProps {
  children: ReactNode;
}

export const LayoutHeaderProvider = (props: ILayoutHeaderProviderProps) => {
  const [headerOption, setHeaderOption] = useState<IHeaderOption>(defaultHeaderOption);

  const contextValue = useMemo(() => ({ headerOption, setHeaderOption }), [headerOption]);

  return <HeaderContext.Provider value={contextValue}>{props.children}</HeaderContext.Provider>;
};
