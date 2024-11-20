import { Canvas, ICanvasRefMethods } from '@/component/canvas/Canvas.tsx';
import { Map, IMapRefMethods } from '@/component/maps/Map.tsx';
import classNames from 'classnames';
import { ICanvasVertex } from '@/utils/screen/canvasUtils.ts';
import { INaverMapVertexPosition } from '@/component/maps/naverMapUtils.ts';
import { useRef, useEffect, useState } from 'react';

interface ICanvasWithMapProps {
  className?: string;
  lat: number;
  lng: number;
  zoom: number;
  mapType: string;
}

export interface ILocationObject {
  canvas: ICanvasVertex;
  map: INaverMapVertexPosition;
}

export const CanvasWithMap = (props: ICanvasWithMapProps) => {
  const mapElement = useRef<HTMLElement | null>(null);
  const canvasMethods = useRef<ICanvasRefMethods | null>(null);
  const canvasElement = useRef<HTMLCanvasElement | null>(null);
  const [mapObject, setMapObject] = useState<naver.maps.Map | null>(null);

  const handleMapRef = (ref: IMapRefMethods | null) => {
    if (ref) {
      const mapObj = ref.getMapObject();
      mapElement.current = ref.getMapContainer();
      if (mapObj) {
        setMapObject(mapObj);
        // TODO: 네이버 지도 객체가 업로드 되고 그 이후에 함수 수행되는 게 맞는지 개선 필요. 지금은 로딩은 비동기인데, 작업은 동기라서 이에 대한 에러가 존재함.
        // console.log('Map 객체:', mapObj);
        // console.log('Canvas 엘리먼트:', canvasMethods.current?.getCanvasElement());
      }
    }
  };

  useEffect(() => {
    if (canvasMethods.current?.getCanvasElement)
      canvasElement.current = canvasMethods.current.getCanvasElement();
  }, []);

  useEffect(() => {
    if (mapObject) {
      // mapObject를 사용하여 추가적인 작업을 수행할 수 있습니다.
      console.log('Map 객체:', mapObject);
      console.log('Canvas 엘리먼트:', canvasElement.current);
    }
  }, [mapObject]);

  // example
  const clickHandler = () => {
    mapElement.current?.click();
    canvasElement.current?.click();
  };

  return (
    <div className={classNames('relative h-screen', props.className)} onClick={clickHandler}>
      <Canvas ref={canvasMethods} />
      <Map
        lat={props.lat}
        lng={props.lng}
        type={props.mapType}
        zoom={props.zoom}
        ref={handleMapRef}
      />
    </div>
  );
};
