import { Canvas } from '@/component/canvas/Canvas.tsx';
import { Map } from '@/component/maps/Map.tsx';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { ICanvasVertex } from '@/utils/screen/canvasUtils.ts';
import { INaverMapVertexPosition } from '@/utils/maps/naverMap/naverMapUtils.ts';

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
  const defaultLocationObject: ILocationObject = {
    canvas: { ne: { x: 0, y: 0 }, nw: { x: 0, y: 0 }, se: { x: 0, y: 0 }, sw: { x: 0, y: 0 } },
    map: {
      ne: { lng: 0, lat: 0 },
      nw: { lng: 0, lat: 0 },
      se: { lng: 0, lat: 0 },
      sw: { lng: 0, lat: 0 },
    },
  };

  const [locationObject, setLocationObject] = useState<ILocationObject>(defaultLocationObject);

  const setCanvasLocation = useCallback((canvas: ICanvasVertex) => {
    setLocationObject(prev => ({ ...prev, canvas }));
  }, []);

  const setNaverMapLocation = useCallback((map: INaverMapVertexPosition) => {
    setLocationObject(prev => ({ ...prev, map }));
  }, []);

  return (
    <div className={classNames('relative h-screen', props.className)}>
      <Canvas setCanvasLocation={setCanvasLocation} locationObject={locationObject} />
      <Map
        lat={props.lat}
        lng={props.lng}
        type={props.mapType}
        zoom={props.zoom}
        setNaverMapLocation={setNaverMapLocation}
      />
    </div>
  );
};
