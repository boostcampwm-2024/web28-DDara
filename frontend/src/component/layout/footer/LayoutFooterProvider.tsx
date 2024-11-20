import { ReactNode, createContext, useReducer, useMemo, useCallback } from 'react';
import { IFooterProps } from '@/component/layout/footer/Footer';

interface ILayoutFooterProviderProps {
  children: ReactNode;
}

interface IFooterOptionContext {
  footerOption: IFooterProps;
  setFooterTitle: (title: string) => void;
  setFooterActive: (active: boolean) => void;
  setFooterTransparency: (isTransparency: boolean) => void;
  setFooterOnClick: (onClick: () => void) => void;
}

const defaultFooterOption: IFooterProps = {
  title: '',
  active: false,
  isTranperency: true,
  onClick: undefined,
};

export const FooterContext = createContext<IFooterOptionContext>({
  footerOption: defaultFooterOption,
  setFooterTitle: () => {},
  setFooterActive: () => {},
  setFooterTransparency: () => {},
  setFooterOnClick: () => {},
});

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_ACTIVE'; payload: boolean }
  | { type: 'SET_TRANSPARENCY'; payload: boolean }
  | { type: 'SET_ONCLICK'; payload: () => void };

const footerReducer = (state: IFooterProps, action: Action): IFooterProps => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_ACTIVE':
      return { ...state, active: action.payload };
    case 'SET_TRANSPARENCY':
      return { ...state, isTranperency: action.payload };
    case 'SET_ONCLICK':
      return { ...state, onClick: action.payload };
    default:
      return state;
  }
};

export const LayoutFooterProvider = (props: ILayoutFooterProviderProps) => {
  const [footerOption, dispatch] = useReducer(footerReducer, defaultFooterOption);

  const setFooterTitle = useCallback((title: string) => {
    dispatch({ type: 'SET_TITLE', payload: title });
  }, []);

  const setFooterActive = useCallback((active: boolean) => {
    dispatch({ type: 'SET_ACTIVE', payload: active });
  }, []);

  const setFooterTransparency = useCallback((isTransparency: boolean) => {
    dispatch({ type: 'SET_TRANSPARENCY', payload: isTransparency });
  }, []);

  const setFooterOnClick = useCallback((onClick: () => void) => {
    dispatch({ type: 'SET_ONCLICK', payload: onClick });
  }, []);

  const contextValue = useMemo(
    () => ({
      footerOption,
      setFooterTitle,
      setFooterActive,
      setFooterTransparency,
      setFooterOnClick,
    }),
    [footerOption],
  );

  return <FooterContext.Provider value={contextValue}>{props.children}</FooterContext.Provider>;
};
