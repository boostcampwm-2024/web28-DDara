import { ReactNode } from 'react';
import classNames from 'classnames';

interface IDropdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const DropdownButton = (props: IDropdownButtonProps) => {
  return (
    <button
      type={props.type ?? 'button'}
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'bg-transparent',
        'w-6',
        'h-6',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
