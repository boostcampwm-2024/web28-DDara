import { ReactNode } from 'react';
import classNames from 'classnames';

interface IDropdownItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DropdownItem = (props: IDropdownItemProps) => {
  return (
    <li className={classNames('list-none px-3 py-1.5 text-base', props.className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 whitespace-nowrap bg-transparent"
        onClick={props.onClick ?? (() => {})}
      >
        {props.children}
      </button>
    </li>
  );
};
