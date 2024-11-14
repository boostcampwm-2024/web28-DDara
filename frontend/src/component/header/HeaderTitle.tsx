import { ReactNode } from 'react';

interface IHeaderTitleProps {
  children: ReactNode;
}

export const HeaderTitle = (props: IHeaderTitleProps) => {
  return <h1 className="flex items-center justify-center">{props.children}</h1>;
};
