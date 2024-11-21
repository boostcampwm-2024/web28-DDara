import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { setNaverMapSync } from '@/component/maps/naverMapUtils.ts';
import { IMapOptions, IMapRefMethods } from '@/component/maps/Map.tsx';

interface INaverMapProps extends IMapOptions {
  onMapInit: (map: naver.maps.Map) => void; // 콜백 프로퍼티 추가
}

export const NaverMap = forwardRef<IMapRefMethods, INaverMapProps>((props, ref) => {
  const naverMapObject = useRef<naver.maps.Map | null>(null);
  const naverMapContainer = useRef<HTMLElement | null>(null);
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
    if (naverMapContainer.current && mapOptions !== null) {
      naverMapObject.current = setNaverMapSync(naverMapContainer.current, mapOptions);
      if (naverMapObject.current !== null) props.onMapInit(naverMapObject.current); // 콜백 호출
    }
  }, [mapOptions]);

  const clickHandler = () => {
    console.log('clicked!');
  };

  useImperativeHandle(ref, () => ({
    getMapObject: () => naverMapObject.current,
    getMapContainer: () => naverMapContainer.current,
  }));

  return <section ref={naverMapContainer} className="h-full w-full" onClick={clickHandler} />;
});
