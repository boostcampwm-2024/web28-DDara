import { ReactNode, createContext, useReducer, useMemo, useCallback } from 'react';
import { IGuestData } from '@/types/channel.types.ts';

export interface IHeaderDropdownOption {
  items: IGuestData[];
}

interface IHeaderDropdownProviderProps {
  children: ReactNode;
}

interface IHeaderDropdownOptionContext {
  headerDropdownOption: IHeaderDropdownOption;
  setItems: (items: IGuestData[]) => void;
}

const defaultHeaderOption: IHeaderDropdownOption = {
  items: [],
};

export const HeaderDropdownContext = createContext<IHeaderDropdownOptionContext>({
  headerDropdownOption: defaultHeaderOption,
  setItems: () => {},
});

type Action = { type: 'SET_ITEMS'; payload: IGuestData[] } | { type: 'RESET' };

const headerDropdownReducer = (
  state: IHeaderDropdownOption,
  action: Action,
): IHeaderDropdownOption => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const HeaderDropdownProvider = (props: IHeaderDropdownProviderProps) => {
  const [headerDropdownOption, dispatch] = useReducer(headerDropdownReducer, defaultHeaderOption);

  const setItems = useCallback((items: IGuestData[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  const resetHeaderContext = () => {
    setItems([]);
  };

  const contextValue = useMemo(
    () => ({
      headerDropdownOption,
      setItems,
      resetHeaderContext,
    }),
    [headerDropdownOption, setItems, resetHeaderContext],
  );

  return (
    <HeaderDropdownContext.Provider value={contextValue}>
      {props.children}
    </HeaderDropdownContext.Provider>
  );
};
