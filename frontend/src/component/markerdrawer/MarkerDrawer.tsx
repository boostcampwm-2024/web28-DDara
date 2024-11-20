import React, { useRef, useState } from 'react';
import { usePanning } from '@/hooks/usePanning';
import { useZoom } from '@/hooks/useZoom';
import { useMarker } from '@/hooks/useMarker';

interface IPoint {
  x: number;
  y: number;
}

const NAVER_STEP_SCALES = [
  100, 50, 30, 20, 10, 5, 3, 1, 0.5, 0.3, 0.1, 0.05, 0.03, 0.02, 0.01, 0.005,
];
// 선의 굵기 상수
const LINE_WIDTH = 2;
// 선의 색 상수
const STROKE_STYLE = 'black';
// 지도의 처음 확대/축소 비율 단계 index
const INITIAL_ZOOM_INDEX = 7;

export const MarkerDrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [point, setPoint] = useState<IPoint>({ x: 0, y: 0 });

  const { mark, scaleRef, viewPosRef } = useMarker({
    canvasRef,
    point,
    lineWidth: LINE_WIDTH,
    strokeStyle: STROKE_STYLE,
  });
  const { handleMouseMove, handleMouseDown, handleMouseUp } = usePanning({
    viewPosRef,
    draw: mark,
  });
  const { handleWheel } = useZoom({
    scaleRef,
    viewPosRef,
    draw: mark,
    stepScales: NAVER_STEP_SCALES,
    initialZoomIndex: INITIAL_ZOOM_INDEX,
  });

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - viewPosRef.current.x) / scaleRef.current;
    const y = (e.clientY - rect.top - viewPosRef.current.y) / scaleRef.current;
    setPoint({ x, y });
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      style={{ border: '1px solid', cursor: 'crosshair' }}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    />
  );
};
