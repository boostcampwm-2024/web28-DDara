import { Map } from '@/component/maps/Map.tsx';
import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider.tsx';
import { useContext, useEffect } from 'react';

export const GuestView = () => {
  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setHeaderOption({
      ...headerContext.headerOption,
      leftButton: 'back',
      rightButton: 'dropdown',
    });
  }, []);

  // TODO: geoCoding API를 이용해서 현재 위치나 시작위치를 기반으로 자동 좌표 설정 구현 (현재: 하드코딩)
  return (
    <div className="h-screen">
      <Map lat={37.3595704} lng={127.105399} type="naver" zoom={17} />
    </div>
  );
};
