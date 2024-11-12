import classNames from 'classnames';
import React, { useState } from 'react';
import { IconType, ButtonType, ToolCategory } from './enumTypes';

/**
 * FloatingButton 컴포넌트는 도구 선택 및 메뉴 토글 기능을 제공하는 플로팅 버튼을 렌더링합니다.
 * @remarks
 * 메뉴가 열리면 툴 선택과 설명 표시가 가능하며, 메뉴를 닫을 때 버튼 아이콘이 변경됩니다.
 * @example
 * return (
 *   <FloatingButton />
 * )
 */
export const FloatingButton = () => {
  const [toolType, setToolType] = useState<ButtonType>(ButtonType.CLOSE);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /**
   * @remarks
   * - 메뉴를 토글하는 함수입니다.
   */
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) {
      setToolType(ButtonType.OPEN);
    } else {
      setToolType(ButtonType.CLOSE);
    }
  };

  /**
   * @remarks
   * 툴을 선택하고 메뉴를 닫는 함수입니다.
   * @param {ButtonType} type - 선택된 툴 타입
   */
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
          'w-12',
          'h-12',
          'rounded-full',
          'flex',
          'justify-center',
          'items-center',
          'text-white',
          'z-10',
        )}
      >
        {React.createElement(IconType[toolType], { className: 'w-6 h-6' })}
      </button>

      {ToolCategory.map(({ type, description, icon }, index) => (
        <button
          type="button"
          onClick={() => handleMenuClick(type)}
          key={type}
          className={classNames(
            'w-10',
            'h-10',
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
            {React.createElement(icon, { className: 'w-5 h-5' })}
            {isMenuOpen && (
              <div
                className={classNames(
                  'w-20',
                  'h-8',
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
