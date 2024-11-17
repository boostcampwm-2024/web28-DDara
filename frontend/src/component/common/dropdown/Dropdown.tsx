import { ReactNode } from 'react';
import { DropdownTrigger } from '@/component/common/dropdown/DropdownTrigger.tsx';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { DropdownMenu } from '@/component/common/dropdown/DropdownMenu.tsx';
import { ToggleProvider } from '@/component/common/dropdown/DropdownContext.tsx';

interface IDropdownProps {
  children: ReactNode;
}

export const Dropdown = (props: IDropdownProps) => {
  return (
    <aside className="relative flex w-fit flex-col">
      <ToggleProvider>{props.children}</ToggleProvider>
    </aside>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
