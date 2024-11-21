import classNames from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface ICanvasProps {
  className?: string;
  // onClick?: () => void;
  // onMouseDown?: () => void;
  // onMouseUp?: () => void;
  // onMouseMove?: () => void;
}

export interface ICanvasRefMethods {
  getCanvasElement: () => HTMLCanvasElement | null;
  onMouseClickHandler: (event?: React.MouseEvent) => void;
}

export const Canvas = forwardRef<ICanvasRefMethods, ICanvasProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useImperativeHandle(ref, () => ({
    getCanvasElement: () => canvasRef.current ?? null,
    onMouseClickHandler: event => {
      console.log(event?.screenX, event?.screenY);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className={classNames(
        'z-1000 pointer-events-none absolute h-full w-full bg-transparent',
        props.className,
      )}
    />
  );
});
