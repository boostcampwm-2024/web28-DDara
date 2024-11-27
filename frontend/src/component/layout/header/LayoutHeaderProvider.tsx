import { ReactNode, createContext, useReducer, useMemo, useCallback } from 'react';
import { IHeaderOption } from '@/component/header/Header.tsx';
import { IGuestData } from '@/types/channel.types.ts';

interface ILayoutHeaderProviderProps {
  children: ReactNode;
}

interface IHeaderOptionContext {
  headerOption: IHeaderOption;
  setTitle: (title: string) => void;
  setSubTitle: (subtitle: string) => void;
  setLeftButton: (leftButton: string) => void;
  setRightButton: (rightButton: string) => void;
  setItems: (items: IGuestData[]) => void;
  resetHeaderContext: () => void;
}

const defaultHeaderOption: IHeaderOption = {
  title: '',
  subtitle: '',
  leftButton: '',
  rightButton: '',
  items: [],
};

export const HeaderContext = createContext<IHeaderOptionContext>({
  headerOption: defaultHeaderOption,
  setTitle: () => {},
  setSubTitle: () => {},
  setLeftButton: () => {},
  setRightButton: () => {},
  setItems: () => {},
  resetHeaderContext: () => {},
});

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_SUBTITLE'; payload: string }
  | { type: 'SET_LEFT_BUTTON'; payload: string }
  | { type: 'SET_RIGHT_BUTTON'; payload: string }
  | { type: 'SET_ITEMS'; payload: IGuestData[] };

const headerReducer = (state: IHeaderOption, action: Action): IHeaderOption => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_SUBTITLE':
      return { ...state, subtitle: action.payload };
    case 'SET_LEFT_BUTTON':
      return { ...state, leftButton: action.payload };
    case 'SET_RIGHT_BUTTON':
      return { ...state, rightButton: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const LayoutHeaderProvider = (props: ILayoutHeaderProviderProps) => {
  const [headerOption, dispatch] = useReducer(headerReducer, defaultHeaderOption);

  const setTitle = useCallback((title: string) => {
    dispatch({ type: 'SET_TITLE', payload: title });
  }, []);

  const setSubTitle = useCallback((subtitle: string) => {
    dispatch({ type: 'SET_SUBTITLE', payload: subtitle });
  }, []);

  const setLeftButton = useCallback((leftButton: string) => {
    dispatch({ type: 'SET_LEFT_BUTTON', payload: leftButton });
  }, []);

  const setRightButton = useCallback((rightButton: string) => {
    dispatch({ type: 'SET_RIGHT_BUTTON', payload: rightButton });
  }, []);

  const setItems = useCallback((items: IGuestData[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  const resetHeaderContext = () => {
    setTitle('');
    setSubTitle('');
    setLeftButton('');
    setRightButton('');
    setItems([]);
  };

  const contextValue = useMemo(
    () => ({
      headerOption,
      setTitle,
      setSubTitle,
      setLeftButton,
      setRightButton,
      setItems,
      resetHeaderContext,
    }),
    [
      headerOption,
      setTitle,
      setSubTitle,
      setLeftButton,
      setRightButton,
      setItems,
      resetHeaderContext,
    ],
  );

  return <HeaderContext.Provider value={contextValue}>{props.children}</HeaderContext.Provider>;
};
