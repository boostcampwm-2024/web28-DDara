import { ReactNode } from 'react';
import classNames from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

export const Button = (props: IButtonProps) => (
  <button type={props.type ?? 'button'} className={classNames(props.className)} {...props}>
    {props.children}
  </button>
);
