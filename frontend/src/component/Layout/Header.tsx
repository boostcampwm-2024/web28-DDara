import React, { ReactNode } from 'react';

interface IHeaderProps {
  title?: string;
  isTransparency?: boolean;
  buttonElement?: ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({ title, isTransparency, buttonElement }) => {
  const background = isTransparency ? '' : 'bg-white';

  return (
    <header className={`w-full h-16 p-4 flex items-center ${background} text-black gap-[16px]`}>
      {buttonElement}
      <h1 className="text-base">{title}</h1>
    </header>
  );
};
