import { ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { ToggleContext } from '@/component/common/dropdown/Dropdown.tsx';

interface IDropdownTriggerProps {
  children: ReactNode;
}

export const DropdownTrigger = (props: IDropdownTriggerProps) => {
  const { setIsOpen } = useContext(ToggleContext);

  const handleOnClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <button
      type="button"
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'bg-transparent',
        'w-fit',
        'h-fit',
      )}
      data-component="DropdownTrigger"
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
};
