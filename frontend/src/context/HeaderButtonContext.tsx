import { createContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface IHeaderButtonProps {
  children: ReactNode;
}

// 버튼 클릭 이벤트 타입 정의
interface IHeaderButtonContextType {
  leftButtonOnclick: () => void;
  rightButtonOnclick: () => void;
  setLeftButtonOnclick: (fn: () => void) => void;
  setRightButtonOnclick: (fn: () => void) => void;
  resetButtonContext: () => void;
}

const defaultButtonContext: IHeaderButtonContextType = {
  leftButtonOnclick: () => {},
  rightButtonOnclick: () => {},
  setLeftButtonOnclick: () => {},
  setRightButtonOnclick: () => {},
  resetButtonContext: () => {},
};

export const HeaderButtonContext = createContext<IHeaderButtonContextType>(defaultButtonContext);

export const HeaderButtonProvider = (props: IHeaderButtonProps) => {
  const [leftButtonOnclick, setLeftButtonOnclick] = useState<() => void>(() => () => {});
  const [rightButtonOnclick, setRightButtonOnclick] = useState<() => void>(() => () => {});

  const setLeft = useCallback((fn: () => void) => setLeftButtonOnclick(() => fn), []);
  const setRight = useCallback((fn: () => void) => setRightButtonOnclick(() => fn), []);

  const resetButtonContext = useCallback(() => {
    setLeftButtonOnclick(() => () => {});
    setRightButtonOnclick(() => () => {});
  }, []);

  const value = useMemo(
    () => ({
      leftButtonOnclick,
      rightButtonOnclick,
      setLeftButtonOnclick: setLeft,
      setRightButtonOnclick: setRight,
      resetButtonContext,
    }),
    [leftButtonOnclick, rightButtonOnclick, setLeft, setRight, resetButtonContext],
  );

  return (
    <HeaderButtonContext.Provider value={value}>{props.children}</HeaderButtonContext.Provider>
  );
};
