import { createContext, ReactNode, useMemo, useState } from 'react';

export interface IToggleContext {
  isOpen: boolean;
  toggle: () => void;
}

interface IToggleProviderProps {
  children: ReactNode;
}

export const ToggleContext = createContext<IToggleContext>({
  isOpen: false,
  toggle: () => {},
});

export const ToggleProvider = (props: IToggleProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen);
  const toggleContextValue = useMemo(() => ({ isOpen, toggle }), [isOpen]);

  return (
    <ToggleContext.Provider value={toggleContextValue}>{props.children}</ToggleContext.Provider>
  );
};
