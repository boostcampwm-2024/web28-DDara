import React, { useEffect, useRef, useState } from 'react';
import { ButtonState } from '@/component/common/enums';
import classNames from 'classnames';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { FloatingButton } from '@/component/common/floatingbutton/FloatingButton.tsx';
import { useFloatingButton } from '@/hooks/useFloatingButton.ts';
import { LINE_WIDTH, STROKE_STYLE } from '@/lib/constants/canvasConstants.ts';
import { ICanvasPoint, IMapCanvasProps, IPoint } from '@/lib/types/canvasInterface.ts';
import { useUndoRedo } from '@/hooks/useUndoRedo.ts';
import startmarker from '@/assets/startmarker.png';
import endmarker from '@/assets/endmarker.png';

export const MapCanvasForDraw = ({
  width,
  height,
  initialCenter,
  initialZoom,
}: IMapCanvasProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [projection, setProjection] = useState<naver.maps.MapSystemProjection | null>(null);

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const [startMarker, setStartMarker] = useState<IPoint | null>(null);
  const [endMarker, setEndMarker] = useState<IPoint | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);

  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [isTouchZooming, setIsTouchZooming] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [touchCenter, setTouchCenter] = useState<{ x: number; y: number } | null>(null);

  const { isMenuOpen, toolType, toggleMenu, handleMenuClick } = useFloatingButton();
  const { pathPoints, addPoint, undo, redo, undoStack, redoStack } = useUndoRedo([]);

  const startImageRef = useRef<HTMLImageElement | null>(null);
  const endImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(initialCenter.lat, initialCenter.lng),
      zoom: initialZoom,
      minZoom: 7,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(33.0, 124.5),
        new naver.maps.LatLng(38.9, 131.9),
      ),
    });

    setMap(mapInstance);
    setProjection(mapInstance.getProjection());

    // TODO: 필요 없을 것으로 예상, 혹시나해서 남겨둔 것이니 필요 없다 판단되면 제거 필요
    // naver.maps.Event.addListener(mapInstance, 'zoom_changed', () => {
    //   setProjection(mapInstance.getProjection());
    //   updateCanvasSize();
    //   redrawCanvas();
    // });
    //
    // naver.maps.Event.addListener(mapInstance, 'center_changed', () => {
    //   setProjection(mapInstance.getProjection());
    //   redrawCanvas();
    // });

    // eslint-disable-next-line consistent-return
    return () => {
      mapInstance.destroy();
    };
  }, []);

  const latLngToCanvasPoint = (latLng: IPoint): ICanvasPoint | null => {
    if (!map || !projection || !canvasRef.current) return null;
    const coord = projection.fromCoordToOffset(new naver.maps.LatLng(latLng.lat, latLng.lng));
    const mapSize = map.getSize();
    const mapCenter = map.getCenter();
    const centerPoint = projection.fromCoordToOffset(mapCenter);
    return {
      x: coord.x - (centerPoint.x - mapSize.width / 2),
      y: coord.y - (centerPoint.y - mapSize.height / 2),
    };
  };

  const canvasPointToLatLng = (point: ICanvasPoint): IPoint | null => {
    if (!map || !projection || !canvasRef.current) return null;
    const mapSize = map.getSize();
    const mapCenter = map.getCenter();
    const centerPoint = projection.fromCoordToOffset(mapCenter);
    const coordPoint = new naver.maps.Point(
      point.x + (centerPoint.x - mapSize.width / 2),
      point.y + (centerPoint.y - mapSize.height / 2),
    );
    const latLng = projection.fromOffsetToCoord(coordPoint);
    return {
      lat: latLng.y,
      lng: latLng.x,
    };
  };

  const updateCanvasSize = () => {
    if (!map || !canvasRef.current) return;
    const mapSize = map.getSize();
    const canvas = canvasRef.current;
    canvas.width = mapSize.width;
    canvas.height = mapSize.height;
    canvas.style.width = `${mapSize.width}px`;
    canvas.style.height = `${mapSize.height}px`;
  };

  const redrawCanvas = () => {
    if (!canvasRef.current || !map) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = (map.getZoom() / LINE_WIDTH) * 5;
    ctx.strokeStyle = STROKE_STYLE;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (startMarker) {
      const startPoint = latLngToCanvasPoint(startMarker);
      if (startPoint && startImageRef.current) {
        const markerSize = map.getZoom() * 2;
        ctx.drawImage(
          startImageRef.current,
          startPoint.x - markerSize / 2,
          startPoint.y - markerSize,
          markerSize,
          markerSize,
        );
      }
    }
    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      if (endPoint && endImageRef.current) {
        const markerSize = map.getZoom() * 2;
        ctx.drawImage(
          endImageRef.current,
          endPoint.x - markerSize / 2,
          endPoint.y - markerSize,
          markerSize,
          markerSize,
        );
      }
    }
    if (pathPoints?.length > 0) {
      ctx.beginPath();
      const firstPoint = latLngToCanvasPoint(pathPoints[0]);

      if (firstPoint) {
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < pathPoints?.length; i++) {
          const point = latLngToCanvasPoint(pathPoints[i]);
          if (point) {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!map || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedPoint = canvasPointToLatLng({ x, y });

    if (!clickedPoint) return;
    switch (toolType) {
      case ButtonState.START_MARKER:
        setStartMarker(clickedPoint);
        break;
      case ButtonState.DESTINATION_MARKER:
        setEndMarker(clickedPoint);
        break;
      case ButtonState.LINE_DRAWING:
        addPoint(clickedPoint);
        break;
      default:
        break;
    }
    redrawCanvas();
  };

  // TODO: 줌인 줌아웃 버튼으로도 접근 가능하도록 추가
  // const handleZoomChange = (zoomChange: number) => {
  //   if (!map) return;
  //   const currentZoom = map.getZoom();
  //   map.setZoom(currentZoom + zoomChange);
  //   redrawCanvas();
  // };

  const handleWheel = (e: React.WheelEvent) => {
    if (!map) return;

    const zoomChange = e.deltaY < 0 ? 1 : -1;

    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + zoomChange);

    redrawCanvas();
  };

  // TODO: 줌인 줌아웃 버튼으로도 접근 가능하도록 추가
  // const handleMapPan = (direction: 'up' | 'down' | 'left' | 'right') => {
  //   if (!map) return;
  //   const moveAmount = 100;
  //   let point: naver.maps.Point;
  //
  //   switch (direction) {
  //     case 'up':
  //       point = new naver.maps.Point(0, -moveAmount);
  //       break;
  //     case 'down':
  //       point = new naver.maps.Point(0, moveAmount);
  //       break;
  //     case 'left':
  //       point = new naver.maps.Point(-moveAmount, 0);
  //       break;
  //     case 'right':
  //       point = new naver.maps.Point(moveAmount, 0);
  //       break;
  //     default:
  //       return;
  //   }
  //
  //   map.panBy(point);
  //   redrawCanvas();
  // };

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
   * @description 터치한 채로 화면을 움직일 (끌어당길) 때 이벤트 (onTouchMove)
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
   * @description 화면에서 터치를 종료할 때 (손을 뗐을 때) 이벤트 (onTouchEnd)
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsTouchZooming(false);
      setTouchStartDistance(null);
      setTouchCenter(null);
      setIsTouching(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      if (canvasRef.current) {
        canvasRef.current.style.pointerEvents = 'none';
      }
      redrawCanvas();
    } else if (canvasRef.current) {
      canvasRef.current.style.pointerEvents = 'auto';
    }
  }, [isDragging]);

  useEffect(() => {
    if (!canvasRef.current || !map) return;
    updateCanvasSize();
  }, [map]);

  useEffect(() => {
    redrawCanvas();
  }, [startMarker, endMarker, pathPoints, map, undoStack, redoStack]);

  return (
    <div
      style={{ position: 'relative', width, height }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {toolType === ButtonState.LINE_DRAWING ? (
        <div className="z-1000 absolute left-1/2 top-[10px] flex -translate-x-1/2 transform gap-2">
          <button
            type="button"
            onClick={undo}
            disabled={undoStack.length === 0}
            className={classNames(
              'h-[35px] w-[35px]',
              undoStack.length === 0 ? 'cursor-not-allowed opacity-50' : '',
            )}
          >
            <MdArrowCircleLeft size={24} />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={redoStack.length === 0}
            className={classNames(
              'h-[35px] w-[35px]',
              redoStack.length === 0 ? 'cursor-not-allowed opacity-50' : '',
            )}
          >
            <MdArrowCircleRight size={24} />
          </button>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'auto',
        }}
        onClick={handleCanvasClick}
      />
      <div className="relative z-10 flex gap-2">
        <FloatingButton
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toolType={toolType}
          handleMenuClick={handleMenuClick}
        />
      </div>

      {/* TODO: 줌인 줌아웃 버튼으로도 접근 가능하도록 추가 */}
      {/* <div className="absolute left-10 top-10 z-10 flex gap-2"> */}
      {/*  <div> */}
      {/*    {isTouchZooming ? 'true' : 'false'} {touchStartDistance} */}
      {/*  </div> */}
      {/*  <button onClick={() => handleZoomChange(1)} className="rounded bg-green-500 p-2"> */}
      {/*    Zoom In */}
      {/*  </button> */}
      {/*  <button onClick={() => handleZoomChange(-1)} className="rounded bg-red-500 p-2"> */}
      {/*    Zoom Out */}
      {/*  </button> */}
      {/*  <button onClick={() => handleMapPan('up')} className="rounded bg-blue-500 p-2"> */}
      {/*    Up */}
      {/*  </button> */}
      {/*  <button onClick={() => handleMapPan('down')} className="rounded bg-blue-500 p-2"> */}
      {/*    Down */}
      {/*  </button> */}
      {/*  <button onClick={() => handleMapPan('left')} className="rounded bg-blue-500 p-2"> */}
      {/*    Left */}
      {/*  </button> */}
      {/*  <button onClick={() => handleMapPan('right')} className="rounded bg-blue-500 p-2"> */}
      {/*    Right */}
      {/*  </button> */}
      {/* </div> */}
    </div>
  );
};
