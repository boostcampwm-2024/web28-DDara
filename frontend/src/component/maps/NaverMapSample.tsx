import { useEffect, useRef } from 'react';
import { setNaverMapSync } from '@/component/maps/naverMapUtils';

export interface INaverMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}

export const NaverMap = (props: INaverMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapOptions: INaverMapOptions = {
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  };

  useEffect(() => {
    if (mapRef.current) {
      setNaverMapSync(mapRef.current, mapOptions);
    }
  }, []);

  return <section ref={mapRef} className="h-full w-full" />;
};
