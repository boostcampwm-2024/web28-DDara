import { useRef, useEffect } from 'react';

interface IPoint {
  x: number;
  y: number;
}

interface IUseDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  points: IPoint[];
  lineWidth: number;
  strokeStyle: string;
  initialScale: number;
}

const INITIAL_POSITION = { x: 0, y: 0 };

export const useDrawing = (props: IUseDrawingProps) => {
  const scaleRef = useRef(props.initialScale);
  const viewPosRef = useRef(INITIAL_POSITION);

  const getCanvasContext = (): CanvasRenderingContext2D | null =>
    props.canvasRef.current?.getContext('2d') || null;

  const setTransform = (context: CanvasRenderingContext2D) => {
    context.setTransform(
      scaleRef.current,
      0,
      0,
      scaleRef.current,
      viewPosRef.current.x,
      viewPosRef.current.y,
    );
  };

  const draw = () => {
    const context = getCanvasContext();
    if (!context) return;

    const canvas = props.canvasRef.current;
    if (!canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setTransform(context);

    if (props.points.length > 1) {
      context.lineWidth = props.lineWidth / scaleRef.current;
      context.strokeStyle = props.strokeStyle;
      context.beginPath();
      context.moveTo(props.points[0].x, props.points[0].y);
      props.points.slice(1).forEach(point => context.lineTo(point.x, point.y));
      context.stroke();
    } else if (props.points.length === 1) {
      context.fillStyle = props.strokeStyle;
      context.beginPath();
      context.arc(
        props.points[0].x,
        props.points[0].y,
        (props.lineWidth + 1) / scaleRef.current,
        0,
        2 * Math.PI,
      );
      context.fill();
    }
  };

  useEffect(() => {
    draw();
  }, [props.points]);

  return { draw, scaleRef, viewPosRef };
};
