import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { setNaverMapSync } from '@/component/maps/naverMapUtils.ts';
import { IMapOptions, IMapRefMethods } from '@/component/maps/Map.types.ts';

interface INaverMapProps extends IMapOptions {
  onMapInit: (map: naver.maps.Map) => void; // 콜백 프로퍼티 추가
}

export const NaverMap = forwardRef<IMapRefMethods, INaverMapProps>((props, ref) => {
  const mapObject = useRef<naver.maps.Map | null>(null);
  const mapContainer = useRef<HTMLElement | null>(null);

  const [mapOptions, setMapOptions] = useState<IMapOptions>({
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  });

  useEffect(() => {
    setMapOptions({
      lat: props.lat,
      lng: props.lng,
      zoom: props.zoom,
    });
  }, [props.lat, props.lng, props.zoom]);

  useEffect(() => {
    if (mapContainer.current && mapOptions) {
      mapObject.current = setNaverMapSync(mapContainer.current, mapOptions);
      if (mapObject.current) props.onMapInit(mapObject.current); // 콜백 호출
    }
  }, [mapOptions]);

  useImperativeHandle(ref, () => ({
    getMapObject: () => {
      if (mapObject) return mapObject.current;
      throw new Error('🚀 지도 로딩 오류 : 지도 객체가 존재하지 않습니다.');
    },
    getMapContainer: () => {
      if (mapContainer) return mapContainer.current;
      throw new Error('🚀 지도 로딩 오류 : 지도 컨테이너가 존재하지 않습니다.');
    },
    onMouseClickHandler: () => {},
  }));

  return <section ref={mapContainer} className="h-full w-full" />;
});
