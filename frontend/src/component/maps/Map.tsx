import { NaverMap } from '@/component/maps/NaverMap.tsx';
import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { INaverMapVertexPosition } from '@/utils/maps/naverMap/naverMapUtils.ts';

interface IMapProps {
  lat: number;
  lng: number;
  className?: string;
  type: string;
  zoom?: number;
  setNaverMapLocation: (map: INaverMapVertexPosition) => void;
}

const validateKindOfMap = (type: string) => ['naver'].includes(type);

export const Map = (props: IMapProps) => {
  if (!validateKindOfMap(props.type)) throw new Error('Invalid map type');

  const [MapComponent, setMapComponent] = useState<ReactNode>();

  useEffect(() => {
    if (props.type === 'naver') {
      setMapComponent(
        <NaverMap
          lat={props.lat}
          lng={props.lng}
          zoom={props.zoom}
          setNaverMapLocation={props.setNaverMapLocation}
        />,
      );
    }
  }, []);

  return (
    <article className={classNames({ 'h-screen': !props.className }, 'z-0', props.className)}>
      {MapComponent}
    </article>
  );
};
