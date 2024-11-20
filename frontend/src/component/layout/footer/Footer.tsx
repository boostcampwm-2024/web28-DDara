import classNames from 'classnames';
import { buttonActiveType } from '../enumTypes';

export interface IFooterProps {
  title?: string;
  onClick?: () => void;
  active?: boolean;
  isTranperency?: boolean;
}

export const Footer = (props: IFooterProps) => {
  const buttonStyle = props.active ? buttonActiveType.ACTIVE : buttonActiveType.PASSIVE;

  return props.isTranperency ? (
    <div />
  ) : (
    <footer className="absolute bottom-5 z-[4000] h-[6%] w-[95%]">
      <button
        className={classNames(
          'w-full',
          'h-full',
          'bg-white',
          'text-black',
          'p-2',
          'rounded-lg',
          buttonStyle,
        )}
        type="button"
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </footer>
  );
};
