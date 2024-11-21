import { NaverMap } from '@/component/maps/NaverMap.tsx';
import { ReactNode, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';

type IMapObject = naver.maps.Map | null;

export interface IMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}

interface IMapProps extends IMapOptions {
  className?: string;
  type: string;
  initMap: (mapObject: IMapObject) => void;
}

// 부모 컴포넌트가 접근할 수 있는 메서드들을 정의한 인터페이스
export interface IMapRefMethods {
  getMapObject: () => naver.maps.Map | null;
  getMapContainer: () => HTMLElement | null;
  onMouseClickHandler: (event?: React.MouseEvent) => void;
}

const validateKindOfMap = (type: string) => ['naver'].includes(type);

export const Map = forwardRef<IMapRefMethods, IMapProps>((props, ref) => {
  if (!validateKindOfMap(props.type)) throw new Error('Invalid map type');

  const mapRef = useRef<IMapRefMethods | null>(null);
  const mapContainer = useRef<HTMLElement | null>(null);
  const [mapObject, setMapObject] = useState<IMapObject>(null);
  const [MapComponent, setMapComponent] = useState<ReactNode>();

  const onMapInit = (mapObj: IMapObject) => {
    setMapObject(mapObj);
  };

  useEffect(() => {
    if (props.type === 'naver') {
      const mapComponent = (
        <NaverMap
          lat={props.lat}
          lng={props.lng}
          zoom={props.zoom}
          ref={mapRef}
          onMapInit={onMapInit}
        />
      );
      setMapComponent(mapComponent);
    }
  }, [props.lat, props.lng, props.zoom, props.type]);

  useEffect(() => {
    mapContainer.current = mapRef.current?.getMapContainer() ?? null;
    props.initMap(mapObject);
  }, [mapObject]);

  useImperativeHandle(ref, () => ({
    getMapObject: () => mapObject,
    getMapContainer: () => mapContainer.current,
    onMouseClickHandler: () => {},
  }));

  return (
    <article
      className={classNames(
        'h-full',
        'w-full',
        'absolute',
        'z-0',
        'pointer-events-none',
        props.className,
      )}
    >
      {MapComponent}
    </article>
  );
});
