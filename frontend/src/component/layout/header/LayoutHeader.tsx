import { useLocation, useParams } from 'react-router-dom';
import { getHeaderInfo } from '@/utils/mapping/HeaderMapping';
import { HeaderLayout } from '@/component/header/HeaderLayout';

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
      leftItems={headerOption.leftItems}
      rightItems={headerOption.rightItems}
    />
  );
};
