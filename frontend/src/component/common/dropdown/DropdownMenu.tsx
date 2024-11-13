import { ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { ToggleContext } from '@/component/common/dropdown/Dropdown.tsx';

interface IDropdownMenuProps {
  children: ReactNode | ReactNode[];
}

export const DropdownMenu = (props: IDropdownMenuProps) => {
  const { isOpen } = useContext(ToggleContext);

  return (
    isOpen && (
      <ul
        className={classNames(
          // 추후 애니메이션 조건부 적용을 위해서 classNames 사용
          'align-center',
          'animate-smoothAppear',
          'absolute',
          'right-0',
          'top-8',
          'z-10',
          'flex',
          'translate-x-0',
          'flex-col',
          'justify-center',
          'gap-2.5',
          'rounded-xl',
          'p-2.5',
          'shadow-2xl',
          'animate-smoothAppear',
          'w-fit',
        )}
      >
        {props.children}
      </ul>
    )
  );
};
