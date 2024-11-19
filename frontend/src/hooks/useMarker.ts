import { useRef, useEffect, useState } from 'react';
import markerImage from '@/assets/marker.png'; // 이미지 import

interface IPoint {
  x: number;
  y: number;
}

interface IUseDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  point: IPoint;
  lineWidth: number;
  strokeStyle: string;
}

const INITIAL_POSITION = { x: 0, y: 0 };
const STEP_SCALES = [100, 50, 30, 20, 10, 5, 3, 1, 0.5, 0.3, 0.1, 0.05, 0.03, 0.02, 0.01, 0.005];

export const useMarker = (props: IUseDrawingProps) => {
  const scaleRef = useRef(STEP_SCALES[7]);
  const viewPosRef = useRef(INITIAL_POSITION);
  const [iconImage, setIconImage] = useState<HTMLImageElement | null>(null);
  const [markerPoint, setMarkerPoint] = useState<IPoint | null>(props.point);
  const iconSize = 20;

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

  const loadIconImage = () => {
    const img = new Image();
    img.src = markerImage;
    img.onload = () => setIconImage(img);
  };

  const mark = () => {
    if (!iconImage || markerPoint === null) return;
    const context = getCanvasContext();
    if (!context) return;

    const canvas = props.canvasRef.current;
    if (!canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setTransform(context);

    context.drawImage(
      iconImage,
      props.point.x - iconSize / 2,
      props.point.y - iconSize,
      iconSize,
      iconSize,
    );
  };
  const deleteMarker = (point: IPoint) => {
    if (point.x === 0 && point.y === 0) return;
    if (markerPoint) {
      const iconLeft = markerPoint.x - iconSize / 2;
      const iconRight = markerPoint.x + iconSize / 2;
      const iconTop = markerPoint.y - iconSize;
      const iconBottom = markerPoint.y;

      const isInsideIcon =
        point.x >= iconLeft && point.x <= iconRight && point.y >= iconTop && point.y <= iconBottom;

      if (isInsideIcon) {
        setMarkerPoint(null);
        return;
      }
    }
    setMarkerPoint(point);
  };

  useEffect(() => {
    setMarkerPoint(props.point);
    loadIconImage();
  }, []);

  const clearCanvas = () => {
    const context = getCanvasContext();
    const canvas = props.canvasRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    deleteMarker(props.point);
  }, [props.point]);

  useEffect(() => {
    if (!iconImage) return;

    if (markerPoint === null) {
      clearCanvas();
    } else {
      mark();
    }
  }, [markerPoint, iconImage]);

  return { mark, scaleRef, viewPosRef };
};
