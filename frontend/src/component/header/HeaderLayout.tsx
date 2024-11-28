import React, { ReactNode } from 'react';
import classNames from 'classnames';
// import { IGuestData } from '@/types/channel.types.ts';
import { HeaderIcon } from './constatnt/HeaderEnums';
import { HeaderIconType } from './constatnt/HeaderType';

interface IHeaderProps {
  leftButton?: HeaderIcon;
  leftButtonOnclick?: () => void;
  rightButton?: HeaderIcon;
  rightButtonOnclick?: () => void;
  title?: ReactNode;
  subtitle?: string;
  //   items?: IGuestData[];
  className?: string;
  userName?: string;
}

export const HeaderLayout = (props: IHeaderProps) => {
  return (
    <header
      className={classNames(
        'absolute flex w-full flex-col gap-2.5 bg-transparent px-4 pb-2 pt-4',
        props.className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={props.leftButtonOnclick}
            className={classNames('flex h-6 w-6 items-center justify-center')}
          >
            {props.leftButton
              ? React.createElement(HeaderIconType[props.leftButton], { className: 'w-6 h-6' })
              : null}
          </button>
          <div className="flex items-center justify-center text-base">
            <div className="font-bold">{props.userName}</div>
            <div>{props.title}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={props.rightButtonOnclick}
          className={classNames('flex h-6 w-6 items-center justify-center')}
        >
          {props.rightButton
            ? React.createElement(HeaderIconType[props.rightButton], { className: 'w-6 h-6' })
            : null}
        </button>
      </div>
      <div className="text-grayscale-400 ml-8 text-xs">{props.subtitle}</div>
    </header>
  );
};
