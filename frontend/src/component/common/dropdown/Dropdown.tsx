import { ReactNode, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DropdownTrigger } from '@/component/common/dropdown/DropdownTrigger.tsx';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { DropdownMenu } from '@/component/common/dropdown/DropdownMenu.tsx';
import { DropdownInstanceContext } from '@/context/DropdownInstanceContext';

interface IDropdownProps {
  /** 드롭다운 컴포넌트 내부에 들어갈 컨텐츠 */
  children: ReactNode;
}

/**
 * 드롭다운 컴포넌트입니다.
 *
 *  @param {ReactNode} children - 드롭다운 컴포넌트 내부에 들어갈 컨텐츠
 *  @return {JSX.Element} 드롭다운 컴포넌트
 *
 *  @remarks
 *  - 드롭다운 컴포넌트는 드롭다운 메뉴를 제공합니다.
 *
 * @example
 *  ```tsx
 *  <Dropdown>
 *    <Dropdown.Trigger>
 *      <MdMenu className="h-6 w-6" />
 *      <span>메뉴</span>
 *    </Dropdown.Trigger>
 *    <Dropdown.Menu>
 *      <Dropdown.Item>메뉴 항목 1</Dropdown.Item>
 *      <Dropdown.Item>메뉴 항목 2</Dropdown.Item>
 *    </Dropdown.Menu>
 *  </Dropdown>
 *  ```
 */

export const Dropdown = (props: IDropdownProps) => {
  const id = useMemo(() => uuidv4(), []); // 각 Dropdown 인스턴스에 고유 ID 생성

  return (
    <DropdownInstanceContext.Provider value={id}>
      <aside className="relative flex w-fit flex-col">{props.children}</aside>
    </DropdownInstanceContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
