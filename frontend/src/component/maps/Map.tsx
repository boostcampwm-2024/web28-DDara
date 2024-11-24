import { ReactNode, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { NaverMap } from '@/component/maps/NaverMap.tsx';
import { IMapObject, IMapOptions, IMapRefMethods } from '@/component/maps/Map.types.ts';
import classNames from 'classnames';

const validateKindOfMap = (type: string) => ['naver'].includes(type);

interface IMapProps extends IMapOptions {
  className?: string;
  type: string;
  initMap: (mapObject: IMapObject) => void;
}

export const Map = forwardRef<IMapRefMethods, IMapProps>((props, ref) => {
  if (!validateKindOfMap(props.type))
    throw new Error('🚀 지도 로딩 오류 : 알 수 없는 지도 타입이 인자로 들어 왔습니다.');

  const mapRefMethods = useRef<IMapRefMethods | null>(null);
  const mapContainer = useRef<HTMLElement | null>(null);

  const [mapObject, setMapObject] = useState<IMapObject>();
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
          ref={mapRefMethods}
          onMapInit={onMapInit}
        />
      );
      setMapComponent(mapComponent);
    }
  }, []);

  useEffect(() => {
    mapContainer.current = mapRefMethods.current?.getMapContainer() ?? null;
    if (mapObject) props.initMap(mapObject);
  }, [mapObject]);

  useImperativeHandle(ref, () => ({
    getMapObject: () => {
      if (mapObject) return mapObject;
      throw new Error('🚀 지도 로딩 오류 : 지도 객체가 존재하지 않습니다.');
    },
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
