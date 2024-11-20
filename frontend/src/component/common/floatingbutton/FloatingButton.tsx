import classNames from 'classnames';
import React from 'react';
import { ButtonState } from '../enums';
import { IconType, ToolCategory } from '../types';

interface IFloatingButtonProps {
  /** 메뉴가 열려있는지 여부를 나타냅니다. */
  isMenuOpen?: boolean;
  /** 메뉴를 토글할 수 있는 함수입니다. */
  toggleMenu?: () => void;
  /** 선택된 도구의 버튼 상태를 의미합니다. */
  toolType: ButtonState;
  /** 도구를 선택할 수 있는 함수입니다. */
  handleMenuClick?: (type: ButtonState) => void;
}

/**
 * FloatingButton 컴포넌트는 도구 선택 및 메뉴 토글 기능을 제공하는 플로팅 버튼을 렌더링합니다.
 * @remarks
 * 메뉴가 열리면 툴 선택과 설명 표시가 가능하며, 메뉴를 닫을 때 버튼 아이콘이 변경됩니다.
 * @example
 * return (
 *   <FloatingButton />
 * )
 */
export const FloatingButton = (props: IFloatingButtonProps) => {
  return (
    <div
      className={classNames('absolute', 'bottom-5', 'right-10', 'flex', 'flex-col', 'items-center')}
    >
      <button
        type="button"
        onClick={props.toggleMenu}
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
          'shadow-floatMenuButton',
          'z-10',
        )}
      >
        {React.createElement(IconType[props.toolType], { className: 'w-6 h-6' })}
      </button>

      {ToolCategory.map(({ type, description, icon }, index) => (
        <button
          type="button"
          onClick={() => props.handleMenuClick?.(type)}
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
            'shadow-floatButton',
            {
              'shadow-none': !props.isMenuOpen,
            },
          )}
          style={{
            bottom: props.isMenuOpen ? `${48 * index + 64}px` : '0px',
            transition: 'bottom 0.3s ease',
          }}
        >
          <div className={classNames('flex', 'items-center')}>
            {React.createElement(icon, { className: 'w-5 h-5' })}
            {props.isMenuOpen && (
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
