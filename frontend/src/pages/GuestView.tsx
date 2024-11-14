import { NaverMap } from '@/component/maps/NaverMap.tsx';

export const GuestView = () => {
  // TODO: geoCoding API를 이용해서 현재 위치나 시작위치를 기반으로 자동 좌표 설정 구현 (현재: 하드코딩)
  return (
    <div className="h-screen">
      <NaverMap lat={37.3595704} lng={127.105399} zoom={17} />
    </div>
  );
};
