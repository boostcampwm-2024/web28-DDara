import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Canvas, ICanvasRefMethods } from '@/component/canvas/Canvas.tsx';
import { Map } from '@/component/maps/Map.tsx';
import { IMapObject, IMapRefMethods } from '@/component/maps/Map.types.ts';
import { useEventHandlers } from '@/component/canvas/useEventHandlers.tsx';

interface ICanvasWithMapProps {
  className?: string;
  lat: number;
  lng: number;
  zoom: number;
  mapType: string;
  allowCanvas?: boolean;
}

export const CanvasWithMap = (props: ICanvasWithMapProps) => {
  const mapRefMethods = useRef<IMapRefMethods | null>(null);
  const canvasRefMethods = useRef<ICanvasRefMethods | null>(null);
  const mapElement = useRef<HTMLElement | null>(null);
  const canvasElement = useRef<HTMLCanvasElement | null>(null);

  const [mapObject, setMapObject] = useState<IMapObject | null>(null);

  useEffect(() => {
    if (canvasRefMethods.current?.getCanvasElement)
      canvasElement.current = canvasRefMethods.current.getCanvasElement();
  }, []);

  useEffect(() => {
    mapElement.current = mapRefMethods.current?.getMapContainer() ?? null;
  }, [mapObject]);

  const { handleClick, handleMouseDown, handleMouseMove, handleMouseUp } = useEventHandlers(
    canvasElement.current,
    canvasRefMethods.current,
    mapElement.current,
    mapRefMethods.current,
    mapObject,
  );

  const initMap = (mapObj: IMapObject | null) => {
    setMapObject(mapObj);
  };

  return (
    <div
      className={classNames('relative h-screen', props.className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {props.allowCanvas && <Canvas ref={canvasRefMethods} />}
      <Map
        lat={props.lat}
        lng={props.lng}
        type={props.mapType}
        zoom={props.zoom}
        ref={mapRefMethods}
        initMap={initMap}
      />
    </div>
  );
};
