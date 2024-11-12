import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { backgroundType } from './enumTypes';

interface IHeaderProps {
  title?: string;
  isTransparency?: boolean;
  buttonElement?: ReactElement;
}

export const Header = (props: IHeaderProps) => {
  const background = props.isTransparency ? backgroundType.TRANSPARENCY : backgroundType.WHITE;

  return (
    <header
      className={classNames(
        'w-full',
        'h-16',
        'p-4',
        'flex ',
        'items-center ',
        'text-black ',
        'gap-[16px]',
        background,
      )}
    >
      {props.buttonElement}
      <h1 className="text-base">{props.title}</h1>
    </header>
  );
};
