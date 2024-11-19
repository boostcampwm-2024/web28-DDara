import classNames from 'classnames';
import { useEffect, useRef } from 'react';

interface ICanvasProps {
  className?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseMove?: () => void;
}

export const Canvas = (props: ICanvasProps) => {
  const { className, ...rest } = props;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  return (
    <canvas
      ref={ref}
      className={classNames('z-1000 absolute h-full w-full bg-transparent', className)}
      {...rest}
    />
  );
};
