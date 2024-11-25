import { useContext } from 'react';
import { Header } from '@/component/header/Header';
import { NoticeText } from '@/component/text/NoticeText';
import { useLocation, useParams } from 'react-router-dom';
import { getHeaderInfo } from '@/utils/mapping/HeaderMapping';
import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider.tsx';

export const LayoutHeader = () => {
  const params = useParams<Record<string, string | undefined>>();
  const urlPath = useLocation();
  const headerOption = getHeaderInfo(urlPath.pathname);
  const headerContext = useContext(HeaderContext);

  return (
    <Header className="z-4000">
      <Header.MainLayout
        leftButton={headerOption.leftButton}
        rightButton={headerOption.rightButton}
        title={`${params.user || ''}${headerOption.title}`}
        items={headerContext.headerOption.items}
      />
      {headerOption.subtitle && (
        <Header.Subtitle>
          <NoticeText>{headerOption.subtitle}</NoticeText>
        </Header.Subtitle>
      )}
    </Header>
  );
};
