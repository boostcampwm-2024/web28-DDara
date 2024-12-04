import React, { ReactNode } from 'react';
import classNames from 'classnames';

export interface IItem {
  id: string; // 고유 식별자
  content: ReactNode;
}

interface IHeaderProps {
  leftItems?: IItem[];
  rightItems?: IItem[];
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
              <div key={item.id} className="flex items-center justify-center">
                {item.content}
              </div>
            ))}
          <div className="flex items-center justify-center text-base">
            <div className="font-bold">{props.userName}</div>
            <div>{props.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {props.rightItems &&
            props.rightItems.map(item => (
              <div key={item.id} className="flex items-center justify-center">
                {item.content}
              </div>
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
