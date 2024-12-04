import { ReactNode, createContext, useReducer, useMemo, useCallback } from 'react';
import { IGuestData } from '@/types/channel.types.ts';

// State
export interface IHeaderDropdownOption {
  items: IGuestData[];
  onClick: (guestId: string) => void;
}

interface IHeaderDropdownProviderProps {
  children: ReactNode;
}

interface IHeaderDropdownOptionContext {
  headerDropdownOption: IHeaderDropdownOption;
  setItems: (items: IGuestData[]) => void;
  setOnClickHandler: (onClickHandler: (guestId: string) => void) => void;
}

const defaultHeaderOption: IHeaderDropdownOption = {
  items: [],
  onClick: () => {},
};

export const HeaderDropdownContext = createContext<IHeaderDropdownOptionContext>({
  headerDropdownOption: defaultHeaderOption,
  setItems: () => {},
  setOnClickHandler: () => {},
});

type Action =
  | { type: 'SET_ITEMS'; payload: IGuestData[] }
  | {
      type: 'SET_ON_CLICK';
      payload: (guestId: string) => void;
    };

const headerDropdownReducer = (
  state: IHeaderDropdownOption,
  action: Action,
): IHeaderDropdownOption => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_ON_CLICK':
      return { ...state, onClick: action.payload };
    default:
      return state;
  }
};

export const HeaderDropdownProvider = (props: IHeaderDropdownProviderProps) => {
  const [headerDropdownOption, dispatch] = useReducer(headerDropdownReducer, defaultHeaderOption);

  const setItems = useCallback((items: IGuestData[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  const setOnClickHandler = useCallback((onClickHandler: (guestId: string) => void) => {
    dispatch({ type: 'SET_ON_CLICK', payload: onClickHandler });
  }, []);

  const contextValue = useMemo(
    () => ({
      headerDropdownOption,
      setItems,
      setOnClickHandler,
    }),
    [headerDropdownOption, setItems, setOnClickHandler],
  );

  return (
    <HeaderDropdownContext.Provider value={contextValue}>
      {props.children}
    </HeaderDropdownContext.Provider>
  );
};
