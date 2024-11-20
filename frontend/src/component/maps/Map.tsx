import { NaverMap } from '@/component/maps/NaverMap.tsx';
import { ReactNode, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';

export interface IMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}

interface IMapProps extends IMapOptions {
  className?: string;
  type: string;
  onMapInit?: (map: naver.maps.Map) => void; // 초기화 완료 시 호출할 콜백 추가
}

// 부모 컴포넌트가 접근할 수 있는 메서드들을 정의한 인터페이스
export interface IMapRefMethods {
  getMapObject: () => naver.maps.Map | null;
  getMapContainer: () => HTMLElement | null;
}

export type IMapObject = naver.maps.Map | null;

const validateKindOfMap = (type: string) => ['naver'].includes(type);

export const Map = forwardRef<IMapRefMethods, IMapProps>((props, ref) => {
  // 캔버스로 전달하기 위한 ref =>  이게 있어야 캔버스에서 추가적인 작업이 되는데, 캔버스까지 전달하기 위한 용도.
  // 나중에 전역 상태로 빼자. -> 여기는 범용적으로 쓸 수 있게 만들어진 공간이니, 그냥 좀 더 활용하자.
  if (!validateKindOfMap(props.type)) throw new Error('Invalid map type');

  const mapRef = useRef<IMapRefMethods | null>(null);

  const [MapComponent, setMapComponent] = useState<ReactNode>();

  useImperativeHandle(ref, () => ({
    getMapObject: () => mapRef.current?.getMapObject() ?? null,
    getMapContainer: () => mapRef.current?.getMapContainer() ?? null,
  }));

  useEffect(() => {
    if (props.type === 'naver') {
      const mapComponent = (
        <NaverMap
          lat={props.lat}
          lng={props.lng}
          zoom={props.zoom}
          ref={mapRef}
          onMapInit={props.onMapInit}
        />
      );
      setMapComponent(mapComponent);
    }
  }, [props.lat, props.lng, props.zoom, props.type]);

  return (
    <article
      className={classNames(
        { 'h-screen': !props.className },
        'z-0',
        'pointer-events-none',
        props.className,
      )}
    >
      {MapComponent}
    </article>
  );
});
