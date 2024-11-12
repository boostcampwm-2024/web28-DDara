import React, { ReactElement } from 'react';
import { backgroundType } from './enumTypes';

interface IHeaderProps {
  title?: string;
  isTransparency?: boolean;
  buttonElement?: ReactElement;
}

export const Header = (props: IHeaderProps) => {
  const background = props.isTransparency ? backgroundType.TRANSPARENCY : backgroundType.WHITE;

  return (
    <header className={`w-full h-16 p-4 flex items-center ${background} text-black gap-[16px]`}>
      {props.buttonElement}
      <h1 className="text-base">{props.title}</h1>
    </header>
  );
};
