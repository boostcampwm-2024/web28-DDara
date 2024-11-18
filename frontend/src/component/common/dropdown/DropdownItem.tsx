import { ReactNode } from 'react';

interface IDropdownItemProps {
  /** 드롭다운 아이템 내용 */
  children: ReactNode;
  /** 버튼 클릭 시 실행할 함수 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * 드롭다운 메뉴의 아이템 컴포넌트입니다.
 *
 * @param {ReactNode} children - 드롭다운 아이템 내용
 * @param {React.MouseEventHandler<HTMLButtonElement>} onClick - 버튼 클릭 시 실행할 함수
 * @return {JSX.Element} 드롭다운 아이템 컴포넌트
 *
 * @remarks
 * - 드롭다운 아이템 컴포넌트는 드롭다운 메뉴 내부에서 사용되어야 합니다.
 * - 드롭다운 아이템 컴포넌트는 드롭다운 메뉴의 아이템 역할을 수행합니다.
 * - 드롭다운 아이템 컴포넌트는 버튼 역할을 수행합니다.
 * - 드롭다운 아이템 컴포넌트는 클릭 시 onClick 함수를 실행합니다.
 *
 * @example
 * ```tsx
 * <Dropdown.Item onClick={handleOnClick}>아이템</Dropdown.Item>
 * ```
 */

export const DropdownItem = (props: IDropdownItemProps) => {
  return (
    <li className="list-none px-3 py-1.5 text-base">
      <button
        type="button"
        className="flex w-full items-center justify-between whitespace-nowrap bg-transparent"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </li>
  );
};
