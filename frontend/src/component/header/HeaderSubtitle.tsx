import { ReactNode } from 'react';

interface IHeaderSubtitleProps {
  children: ReactNode;
}

export const HeaderSubtitle = (props: IHeaderSubtitleProps) => {
  return <div>{props.children}</div>;
};
