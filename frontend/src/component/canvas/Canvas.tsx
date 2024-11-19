import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { getCanvasVertexPosition, ICanvasVertex } from '@/utils/screen/canvasUtils.ts';
import { ILocationObject } from '@/component/canvas/CanvasWithMap.tsx';

interface ICanvasProps {
  className?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseMove?: () => void;
  setCanvasLocation?: (canvas: ICanvasVertex) => void;
  locationObject: ILocationObject;
}

export const Canvas = (props: ICanvasProps) => {
  const { className, setCanvasLocation, locationObject, ...rest } = props;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    context.fillRect(0, 0, 200, 200);
  }, []);

  useEffect(() => {
    if (ref.current !== null && setCanvasLocation) {
      setCanvasLocation(getCanvasVertexPosition(ref.current));
    }
  }, [locationObject.map]);

  return (
    <canvas
      ref={ref}
      className={classNames(
        'z-1000 pointer-events-none absolute h-full w-full bg-transparent',
        className,
      )}
      {...rest}
    />
  );
};
