import React from 'react';
import classNames from 'classnames';
import { buttonActiveType } from './enumTypes';

interface IFooterProps {
  title?: string;
  onClick?: () => void;
  active?: boolean;
  isTranperency?: boolean;
}

export const Footer = ({ title, onClick, active = false, isTranperency = true }: IFooterProps) => {
  const buttonStyle = active ? buttonActiveType.ACTIVE : buttonActiveType.PASSIVE;

  return isTranperency ? (
    <footer className="absolute bottom-5 h-[6%] w-[95%]">
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
        onClick={onClick}
      >
        {title}
      </button>
    </footer>
  ) : (
    <div />
  );
};
