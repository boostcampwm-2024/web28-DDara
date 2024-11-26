import classNames from 'classnames';
import { buttonActiveStyle, buttonActiveType } from '../enumTypes';

export interface IFooterProps {
  title?: string;
  onClick?: () => void;
  active?: buttonActiveType;
  isTranperency?: boolean;
}

export const Footer = (props: IFooterProps) => {
  const buttonStyle =
    props.active === buttonActiveType.ACTIVE ? buttonActiveStyle.ACTIVE : buttonActiveStyle.PASSIVE;
  const handleClick = () => {
    // ACTIVE 상태일 때만 onClick 실행
    if (props.active === buttonActiveType.ACTIVE && props.onClick) {
      props.onClick();
    }
  };

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
        onClick={handleClick}
      >
        {props.title}
      </button>
    </footer>
  );
};
