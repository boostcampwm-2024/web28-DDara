import { ReactNode, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ToggleContext } from '@/component/common/dropdown/DropdownContext';

interface IDropdownMenuProps {
  children: ReactNode | ReactNode[];
}

export const DropdownMenu = (props: IDropdownMenuProps) => {
  const { isOpen, toggle } = useContext(ToggleContext);
  const ref = useRef<HTMLUListElement | null>(null);

  const handleOutSideClick = (event: MouseEvent) => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (
      ref.current &&
      target &&
      !ref.current.contains(target) &&
      target.dataset.component !== 'DropdownTrigger'
    ) {
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutSideClick);
    return () => {
      document.removeEventListener('click', handleOutSideClick);
    };
  }, []);

  return (
    isOpen && (
      <ul
        ref={ref}
        className={classNames(
          // 추후 애니메이션 조건부 적용을 위해서 classNames 사용
          'align-center',
          'animate-smoothAppear',
          'absolute',
          'right-0',
          'top-8',
          'z-10',
          'flex',
          'flex-col',
          'justify-center',
          'gap-2.5',
          'rounded-xl',
          'p-2.5',
          'shadow-2xl',
          'w-fit',
          'bg-white',
        )}
      >
        {props.children}
      </ul>
    )
  );
};
