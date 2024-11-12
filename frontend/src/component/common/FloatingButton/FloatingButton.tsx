import classNames from 'classnames';
import React, { useState } from 'react';
import { IconType, ButtonType, ToolCategory } from './enumTypes';

/**
 * FloatingButton 컴포넌트는 도구 선택 및 메뉴 토글 기능을 제공하는 플로팅 버튼을 렌더링합니다.
 * 사용자가 메뉴 아이콘을 클릭하면 툴을 변경할 수 있으며, 메뉴가 열리면 각 툴에 대한 설명도 표시됩니다.
 * @component
 * @example
 * return (
 *   <FloatingButton />
 * )
 */
export const FloatingButton: React.FC = () => {
  const [toolType, setToolType] = useState<ButtonType>(ButtonType.CLOSE);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /**
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
