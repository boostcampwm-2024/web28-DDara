import { useState, RefObject } from 'react';

export const useCanvasInteraction = (
  map: naver.maps.Map | null,
  canvasRef: RefObject<HTMLCanvasElement>,
  redrawCanvas: () => void,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);
  const [isTouchZooming, setIsTouchZooming] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [touchCenter, setTouchCenter] = useState<{ x: number; y: number } | null>(null);

  /**
   * @description 마우스 클릭을 시작했을 때 이벤트 (onMouseDown)
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!map || !canvasRef.current) return;

    setDragStartTime(Date.now());
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  /**
   * @description 마우스가 움직일 때 이벤트 (onMouseMove)
   */
  const handleMouseMove = () => {
    if (!dragStartTime) return;

    // TODO: 클릭 후 0.3초 이상이 경과했으면 dragging 시작, 이동 관련 로직 개선 필요
    const timeElapsed = Date.now() - dragStartTime;
    if (timeElapsed > 300 && !isDragging) {
      setIsDragging(true);
    }

    if (isDragging) {
      redrawCanvas();
    }
  };

  /**
   * @description 마우스를 손에서 떼서 클릭이 끝났을 때 이벤트 (onMouseUp)
   */
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartTime(null);
  };

  /**
   * @description 줌 동작 처리 (onWheel)
   */
  const handleWheel = (e: React.WheelEvent) => {
    if (!map) return;
    const zoomChange = e.deltaY < 0 ? 1 : -1;
    map.setZoom(map.getZoom() + zoomChange);
    redrawCanvas();
  };

  /**
   * @description 터치 시작될 때 이벤트 (onTouchStart)
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsTouchZooming(true);

      const distance = Math.sqrt(
        (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
          (e.touches[0].clientY - e.touches[1].clientY) ** 2,
      );

      setTouchStartDistance(distance);

      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      setTouchCenter({ x: centerX, y: centerY });
    } else if (e.touches.length === 1) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      setDragStartPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
      setIsTouching(true);
    }
  };

  /**
   * @description 터치한 채로 화면을 움직일 때 이벤트 (onTouchMove)
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTouchZooming && e.touches.length === 2 && touchStartDistance) {
      const newDistance = Math.sqrt(
        (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
          (e.touches[0].clientY - e.touches[1].clientY) ** 2,
      );
      const zoomChange = (newDistance - touchStartDistance) / 30; // TODO: 스케일링 비율 조정
      const currentZoom = map?.getZoom() ?? 10;

      map?.setOptions({ zoomOrigin: touchCenter });
      map?.setZoom(currentZoom + zoomChange);

      setTouchStartDistance(newDistance);
    } else if (isTouching && e.touches.length === 1) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = e.touches[0].clientX - rect.left;
      const newY = e.touches[0].clientY - rect.top;

      const deltaX = dragStartPos.x - newX;
      const deltaY = dragStartPos.y - newY;

      map?.panBy(new naver.maps.Point(deltaX, deltaY));
      setDragStartPos({ x: newX, y: newY });
    }
    redrawCanvas();
  };

  /**
   * @description 터치 종료 시 이벤트 (onTouchEnd)
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsTouchZooming(false);
      setTouchStartDistance(null);
      setTouchCenter(null);
      setIsTouching(false);
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging,
    isTouching,
  };
};
