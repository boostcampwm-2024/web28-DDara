import { ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { ToggleContext } from '@/component/common/dropdown/DropdownContext';

interface IDropdownTriggerProps {
  /** 버튼 내부에 들어갈 컨텐츠 */
  children: ReactNode;
}

/**
 * 드롭다운에서 메뉴를 열고 닫는 트리거 컴포넌트입니다.
 *
 *  @param {ReactNode} children - 버튼 내부에 들어갈 컨텐츠
 *  @return {JSX.Element} 드롭다운 트리거 컴포넌트
 *
 *  @remarks
 *  - 드롭다운 트리거 컴포넌트를 사용하여 드롭다운 메뉴를 열고 닫을 수 있습니다.
 *  - 드롭다운 트리거 컴포넌트는 드롭다운 컴포넌트 내부에서 사용되어야 합니다.
 *  - 드롭다운 트리거 컴포넌트는 버튼 역할을 수행합니다.
 *
 * @example
 *  ```tsx
 *  <Dropdown.Trigger>
 *    <MdMenu className="h-6 w-6" />
 *    <span>메뉴</span>
 *  </Dropdown.Trigger>
 *  ```
 */

export const DropdownTrigger = (props: IDropdownTriggerProps) => {
  const { toggle } = useContext(ToggleContext);

  const handleOnClick = () => {
    toggle();
  };

  return (
    <button
      type="button"
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'bg-transparent',
        'w-fit',
        'h-fit',
      )}
      data-component="DropdownTrigger"
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  );
};
