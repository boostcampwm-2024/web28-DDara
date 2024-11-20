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
    <footer className="absolute bottom-5 left-1/2 z-[4000] h-[6%] w-[95%] -translate-x-1/2 transform">
      <button
        className={classNames(
          'w-full',
          'h-full',
          'bg-white',
          'text-black',
          'font-semibold',
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
