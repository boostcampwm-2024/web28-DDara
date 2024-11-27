import { ReactNode } from 'react';
import { Header } from '@/component/header/Header.tsx';
import { IGuestData } from '@/types/channel.types.ts';

interface IHeaderMainLayoutProps {
  leftButton?: string;
  rightButton?: string;
  title?: ReactNode;
  items?: IGuestData[];
}

export const HeaderMainLayout = (props: IHeaderMainLayoutProps) => {
  const chooseButton = (buttonName: string) => {
    switch (buttonName) {
      case 'back':
        return <Header.BackButton />;
      case 'dropdown':
        if (props.items) return <Header.Dropdown items={props.items} />;
        return <Header.Dropdown items={[]} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {props.leftButton && chooseButton(props.leftButton)}
        {props.title}
      </div>
      {props.rightButton && chooseButton(props.rightButton)}
    </div>
  );
};
