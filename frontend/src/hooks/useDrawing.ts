import { useRef, useEffect } from 'react';
import startmarker from '@/assets/startmarker.png';
import endmarker from '@/assets/endmarker.png';

interface IPoint {
  x: number;
  y: number;
}

interface IUseDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  points: IPoint[];
  startPoint: IPoint | null;
  endPoint: IPoint | null;
  lineWidth: number;
  strokeStyle: string;
  initialScale: number;
}

const INITIAL_POSITION = { x: 0, y: 0 };

export const useDrawing = (props: IUseDrawingProps) => {
  const scaleRef = useRef(props.initialScale);
  const viewPosRef = useRef(INITIAL_POSITION);

  const startImageRef = useRef<HTMLImageElement | null>(null);
  const endImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;
  }, []);

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

    if (props.startPoint && startImageRef.current) {
      const { x, y } = props.startPoint;
      const markerSize = 32 / scaleRef.current;
      context.drawImage(
        startImageRef.current,
        x - markerSize / 2,
        y - markerSize,
        markerSize,
        markerSize,
      );
    }

    if (props.endPoint && endImageRef.current) {
      const { x, y } = props.endPoint;
      const markerSize = 32 / scaleRef.current;
      context.drawImage(
        endImageRef.current,
        x - markerSize / 2,
        y - markerSize,
        markerSize,
        markerSize,
      );
    }
  };

  useEffect(() => {
    draw();
  }, [props.points, props.startPoint, props.endPoint]);

  return { draw, scaleRef, viewPosRef };
};
