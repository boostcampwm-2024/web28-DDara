import { ReactNode } from 'react';
import { HeaderDropdown } from '@/component/header/HeaderDropdown.tsx';
import { HeaderBackButton } from '@/component/header/HeaderBackButton.tsx';
import { HeaderTitle } from '@/component/header/HeaderTitle.tsx';
import { HeaderMainLayout } from '@/component/header/HeaderMainLayout.tsx';
import { HeaderSubtitle } from '@/component/header/HeaderSubtitle.tsx';
import classNames from 'classnames';

interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface IHeaderOption {
  leftButton?: string;
  rightButton?: string;
  title?: ReactNode;
  subtitle?: string;
}

export const Header = (props: IHeaderProps) => {
  return (
    <header
      className={classNames(
        'absolute',
        'z-[2000]',
        'flex w-full',
        'flex-col',
        'gap-2.5',
        'bg-transparent',
        'p-4',
        props.className?.split(' '),
      )}
    >
      {props.children}
    </header>
  );
};

Header.BackButton = HeaderBackButton;
Header.Dropdown = HeaderDropdown;
Header.Title = HeaderTitle;
Header.MainLayout = HeaderMainLayout;
Header.Subtitle = HeaderSubtitle;
