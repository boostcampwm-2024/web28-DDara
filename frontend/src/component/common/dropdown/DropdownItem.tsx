import { ReactNode } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface IDropdownItemProps {
  children: ReactNode;
  path?: string;
  className?: string;
  onClick?: () => void;
}

export const DropdownItem = (props: IDropdownItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${location.pathname}/${props.path}`);
  };

  return (
    <li className={classNames('list-none px-3 py-1.5 text-base', props.className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 whitespace-nowrap bg-transparent"
        onClick={props.onClick ? props.onClick : handleClick}
      >
        {props.children}
      </button>
    </li>
  );
};
