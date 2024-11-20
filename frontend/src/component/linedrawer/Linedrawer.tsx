import React, { useRef, useState, useEffect } from 'react';

interface IPoint {
  x: number;
  y: number;
}

interface ILinedrawerProps {
  width?: number | string;
  height?: number | string;
}

export const Linedrawer: React.FC<ILinedrawerProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<IPoint[]>([]);
  const [previewPoint, setPreviewPoint] = useState<IPoint | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.strokeStyle = 'black';

    if (points.length > 1) {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.stroke();
    }

    if (points.length > 0 && previewPoint) {
      context.beginPath();
      context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
      context.lineTo(previewPoint.x, previewPoint.y);
      context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      context.stroke();
    }
  }, [points, previewPoint]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newPoint = { x, y };

    setPoints([...points, newPoint]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (points.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPreviewPoint({ x, y });
  };

  return (
    <div className="z-11 absolute">
      <canvas
        ref={canvasRef}
        // TODO : canvas의 넓이 높이 지도에 맞게 조절
        width="800"
        height="600"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        className="border border-gray-300"
        style={{ backgroundColor: 'transparent' }}
        data-testid="canvas"
      />
    </div>
  );
};
