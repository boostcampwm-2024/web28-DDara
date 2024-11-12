import { useEffect, useRef } from 'react';
import { INaverMapOptions, setNaverMapObj } from '@/utils/maps/naverMap/setNaverMapObj.ts';

/**
 * @param {INaverMapOptions} props
 * @returns {ReactNode}
 *
 * @remarks
 * - 네이버 지도를 렌더링합니다.
 *
 * @example
 * - 사용 예시
 * ```tsx
 * <NaverMap lat={37.3595704} long={127.105399} />
 * ```
 */

export const NaverMap = (props: INaverMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapOptions: INaverMapOptions = {
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  };

  useEffect(() => {
    if (mapRef.current) {
      setNaverMapObj(mapRef.current, mapOptions);
    }
  }, []);

  return <section ref={mapRef} className="w-full h-full" />;
};
