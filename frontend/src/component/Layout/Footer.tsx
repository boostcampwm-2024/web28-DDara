import React from 'react';
import classNames from 'classnames';
import { buttonActiveType } from './enumTypes';

interface IFooterProps {
  title?: string;
  onClick?: () => void;
  active?: boolean;
}

export const Footer = (props: IFooterProps) => {
  const buttonStyle = props.active ? buttonActiveType.ACTIVE : buttonActiveType.PASSIVE;

  return (
    <footer className="absolute bottom-5 w-[95%] h-[6%]">
      <button
        className={classNames(
          'w-full',
          'h-full',
          'bg-white',
          'text-black',
          'p-2',
          'rounded-lg',
          buttonStyle,
        )}
        type="button"
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </footer>
  );
};
