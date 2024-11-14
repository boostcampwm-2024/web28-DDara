import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { DropdownTrigger } from '@/component/common/dropdown/DropdownTrigger.tsx';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { DropdownMenu } from '@/component/common/dropdown/DropdownMenu.tsx';

interface IDropdownProps {
  children: ReactNode;
}

export interface IToggleContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleContext = createContext<IToggleContext>({
  isOpen: false,
  setIsOpen: () => {},
});

// Todo : 드랍다운 외부에서 클릭시 창 닫히게 설정
export const Dropdown = (props: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <aside className="relative flex w-fit flex-col">
      <ToggleContext.Provider value={toggleContextValue}>{props.children}</ToggleContext.Provider>
    </aside>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
