import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';
import { useContext, useEffect } from 'react';

export const GuestView = () => {
  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setRightButton('dropdown');
    headerContext.setLeftButton('back');
    headerContext.setItems(['사용자 1', '테스트 2', '길동이']);
  }, []);

  // TODO: geoCoding API를 이용해서 현재 위치나 시작위치를 기반으로 자동 좌표 설정 구현 (현재: 하드코딩)
  return <div>hello</div>;
};
