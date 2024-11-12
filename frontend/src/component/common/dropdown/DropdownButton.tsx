import { ReactNode } from 'react';
import classNames from 'classnames';

interface IDropdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DropdownButton = (props: IDropdownButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'bg-transparent',
        'w-6',
        'h-6',
        props.className,
      )}
      onClick={props.onclick}
    >
      {props.children}
    </button>
  );
};
