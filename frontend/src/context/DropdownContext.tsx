// DropdownContext.tsx
import { createContext, ReactNode, useState, useMemo } from 'react';

export interface IToggleContext {
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

interface IToggleProviderProps {
  children: ReactNode;
}

export const ToggleContext = createContext<IToggleContext>({
  openDropdownId: null,
  setOpenDropdownId: () => {},
});

export const ToggleProvider = ({ children }: IToggleProviderProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const value = useMemo(() => ({ openDropdownId, setOpenDropdownId }), [openDropdownId]);

  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};
