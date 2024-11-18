import { Canvas } from '@/component/canvas/Canvas.tsx';
import { Map } from '@/component/maps/Map.tsx';
import classNames from 'classnames';

interface ICanvasWithMapProps {
  className?: string;
  lat: number;
  lng: number;
  zoom: number;
  mapType: string;
}

export const CanvasWithMap = (props: ICanvasWithMapProps) => {
  return (
    <div className={classNames('relative h-screen', props.className)}>
      <Canvas />
      <Map lat={props.lat} lng={props.lng} type={props.mapType} zoom={props.zoom} />
    </div>
  );
};
