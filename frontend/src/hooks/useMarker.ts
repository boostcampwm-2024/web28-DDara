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
    img.src = markerImage; // import한 경로 사용
    img.onload = () => setIconImage(img);
  };

  const mark = () => {
    if (!iconImage) return;

    const context = getCanvasContext();
    if (!context) return;

    const canvas = props.canvasRef.current;
    if (!canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setTransform(context);

    // 아이콘 크기 설정
    const iconSize = (props.lineWidth + 1) / scaleRef.current;

    // 아이콘 이미지를 캔버스에 그리기
    context.drawImage(
      iconImage,
      props.point.x - iconSize / 2, // 중앙 정렬
      props.point.y - iconSize / 2,
      iconSize,
      iconSize,
    );
  };

  useEffect(() => {
    loadIconImage();
  }, []); // 초기 렌더 시 이미지를 로드

  useEffect(() => {
    mark();
  }, [props.point, iconImage]); // point나 iconImage가 바뀔 때마다 그리기

  return { mark, scaleRef, viewPosRef };
};
