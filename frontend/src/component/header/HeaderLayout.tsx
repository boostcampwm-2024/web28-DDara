import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface IHeaderProps {
  leftItems?: ReactNode[];
  rightItems?: ReactNode[];
  title?: ReactNode;
  subtitle?: string;
  subtitleIcons?: React.ComponentType<{}>;
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
          {props.leftItems &&
            props.leftItems.map(item => (
              <div className="flex items-center justify-center">{item}</div>
            ))}
          <div className="flex items-center justify-center text-base">
            <div className="font-bold">{props.userName}</div>
            <div>{props.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {props.rightItems &&
            props.rightItems.map(item => (
              <div className="flex items-center justify-center">{item}</div>
            ))}
        </div>
      </div>
      <div className="text-grayscale-400 ml-4 flex flex-row gap-1 text-xs">
        {props.subtitleIcons && <props.subtitleIcons />}
        {props.subtitle}
      </div>
    </header>
  );
};
