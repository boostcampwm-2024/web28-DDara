import classNames from 'classnames';
import React, { useState } from 'react';
import { IconType, ButtonType, ToolCategory } from './enumTypes';

export const FloatingButton = () => {
  const [toolType, setToolType] = useState<ButtonType>(ButtonType.CLOSE);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 메뉴 열기/닫기
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) {
      setToolType(ButtonType.OPEN);
    } else {
      setToolType(ButtonType.CLOSE);
    }
  };

  // 메뉴 아이콘 클릭 시 툴 변경
  const handleMenuClick = (type: ButtonType) => {
    setIsMenuOpen(false);
    setToolType(type);
  };

  return (
    <div
      className={classNames('absolute', 'bottom-5', 'right-10', 'flex', 'flex-col', 'items-center')}
    >
      <button
        type="button"
        onClick={toggleMenu}
        className={classNames(
          'absolute',
          'bottom-0',
          'bg-blueGray-800',
          'w-[50px]',
          'h-[50px]',
          'rounded-full',
          'flex',
          'justify-center',
          'items-center',
          'text-white',
          'z-10',
        )}
      >
        {React.createElement(IconType[toolType], { className: 'w-[24px] h-[24px]' })}
      </button>

      {ToolCategory.map(({ type, description, icon }, index) => (
        <button
          type="button"
          onClick={() => handleMenuClick(type)}
          key={type}
          className={classNames(
            'w-[40px]',
            'h-[40px]',
            'bg-blueGray-200',
            'text-white',
            'rounded-full',
            'flex',
            'items-center',
            'justify-center',
            'absolute',
            'transition-all',
            'duration-300',
          )}
          style={{ bottom: isMenuOpen ? `${(index + 1) * 60}px` : '0px' }}
        >
          <div className={classNames('flex', 'items-center')}>
            {React.createElement(icon, { className: 'w-[20px] h-[20px]' })}
            {isMenuOpen && (
              <div
                className={classNames(
                  'w-[78px]',
                  'h-[30px]',
                  'bg-blueGray-200',
                  'absolute',
                  'right-12',
                  'text-white',
                  'text-xs',
                  'flex',
                  'items-center',
                  'justify-center',
                  'rounded-md',
                  'opacity-[0.5]',
                )}
              >
                {description}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
