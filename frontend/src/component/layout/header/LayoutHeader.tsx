import { useLocation, useParams } from 'react-router-dom';
import { getHeaderInfo } from '@/utils/mapping/HeaderMapping';
import { HeaderLayout } from '@/component/header/HeaderLayout';
import { useContext } from 'react';
import { HeaderButtonContext } from '@/context/HeaderButtonContext';

export const LayoutHeader = () => {
  const params = useParams<Record<string, string | undefined>>();
  const urlPath = useLocation();
  const headerOption = getHeaderInfo(urlPath.pathname);
  const { leftButtonOnclick, rightButtonOnclick } = useContext(HeaderButtonContext);

  return (
    <HeaderLayout
      leftButton={headerOption.leftButton}
      rightButton={headerOption.rightButton}
      className="z-[5000] bg-white"
      userName={`${params.user}`}
      title={`${headerOption.title}`}
      subtitle={`${headerOption.subtitle}`}
      leftButtonOnclick={leftButtonOnclick}
      rightButtonOnclick={rightButtonOnclick}
    />
  );
};
