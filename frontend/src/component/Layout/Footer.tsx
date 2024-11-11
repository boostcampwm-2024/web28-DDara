import React from 'react';

interface IFooterProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
}

export const Footer: React.FC<IFooterProps> = ({ title, onClick, active }) => {
  const shadow = active ? 'shadow-float' : 'shadow-basic';
  const fontColor = active ? 'text-gray-900' : 'text-gray-100';

  return (
    <footer className="absolute bottom-5 w-[95%] h-[6%]">
      <button
        className={`w-full h-full bg-white text-black p-2 rounded-lg ${shadow} ${fontColor}`}
        type="button"
        onClick={onClick}
      >
        {title}
      </button>
    </footer>
  );
};
