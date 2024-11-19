import { useEffect, useRef } from 'react';
import {
  getNaverMapVertexPosition,
  INaverMapOptions,
  INaverMapVertexPosition,
  setNaverMap,
} from '@/utils/maps/naverMap/naverMapUtils.ts';

interface INaverMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  setNaverMapLocation: (map: INaverMapVertexPosition) => void;
}

export const NaverMap = (props: INaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapOptions: INaverMapOptions = {
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  };
  let map: naver.maps.Map;
  let mapLoc: INaverMapVertexPosition;

  useEffect(() => {
    if (mapRef.current) {
      map = setNaverMap(mapRef.current, mapOptions);
      mapLoc = getNaverMapVertexPosition(map);

      props.setNaverMapLocation(mapLoc);
    }
  }, []);

  return <section ref={mapRef} className="h-full w-full" />;
};
