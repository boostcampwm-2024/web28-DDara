import { useLocation, useParams } from 'react-router-dom';
import { getHeaderInfo } from '@/utils/mapping/HeaderMapping.ts';
import { HeaderLayout } from '@/component/header/HeaderLayout.tsx';

export const LayoutHeader = () => {
  const params = useParams<Record<string, string | undefined>>();
  const urlPath = useLocation();
  const headerOption = getHeaderInfo(urlPath.pathname);
  return (
    <HeaderLayout
      className="z-[5000]"
      userName={`${params.user || ''}`}
      title={`${headerOption.title}`}
      subtitle={`${headerOption.subtitle}`}
      subtitleIcons={headerOption.subtitleIcons}
      leftItems={headerOption.leftItems}
      rightItems={headerOption.rightItems}
    />
  );
};
