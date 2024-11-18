import { useContext } from 'react';
import { Header } from '@/component/header/Header';
import { NoticeText } from '@/component/text/NoticeText';
import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';

export const LayoutHeader = () => {
  const { headerOption } = useContext(HeaderContext);

  return (
    <Header className="z-1000">
      <Header.MainLayout
        leftButton={headerOption.leftButton}
        rightButton={headerOption.rightButton}
        title={headerOption.title}
        items={headerOption.items}
      />
      {headerOption.subtitle && (
        <Header.Subtitle>
          <NoticeText>{headerOption.subtitle}</NoticeText>
        </Header.Subtitle>
      )}
    </Header>
  );
};
