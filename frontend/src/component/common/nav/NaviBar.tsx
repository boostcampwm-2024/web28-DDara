import { ReactNode } from 'react';
import classNames from 'classnames';

interface INaviBarProps {
  children?: ReactNode;
  className?: string;
}

export const NaviBar = (props: INaviBarProps) => (
  <header className={classNames(props.className)} {...props}>
    {props.children}
  </header>
);
