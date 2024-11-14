import { ReactNode } from 'react';

interface IDropdownItemProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DropdownItem = (props: IDropdownItemProps) => {
  // undefined는 react에서 랜더링 하지 않음
  return (
    <li className="px-3 py-1.5 text-base">
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
