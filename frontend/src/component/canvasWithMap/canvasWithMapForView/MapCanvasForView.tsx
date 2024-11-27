import React, { useEffect, useRef, useState } from 'react';
import { ICanvasPoint, IMapCanvasViewProps, IPoint } from '@/lib/types/canvasInterface.ts';
import startmarker from '@/assets/startmarker.png';
import endmarker from '@/assets/endmarker.png';
import { LINE_WIDTH, STROKE_STYLE } from '@/lib/constants/canvasConstants.ts';

export const MapCanvasForView = ({
  lat,
  lng,
  otherLocations,
  guests,
  width,
  height,
}: IMapCanvasViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [projection, setProjection] = useState<naver.maps.MapSystemProjection | null>(null);

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);

  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [isTouchZooming, setIsTouchZooming] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [touchCenter, setTouchCenter] = useState<{ x: number; y: number } | null>(null);

  const startImageRef = useRef<HTMLImageElement | null>(null);
  const endImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;
    console.log(guests);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 10,
      minZoom: 7,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(33.0, 124.5),
        new naver.maps.LatLng(38.9, 131.9),
      ),
    });

    setMap(mapInstance);
    setProjection(mapInstance.getProjection());

    return () => {
      mapInstance.destroy();
    };
  }, []);

  const getMarkerColor = (token: string) => {
    // 문자열 해싱을 통해 고유 숫자 생성
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      hash = token.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 해시 값을 기반으로 RGB 값 생성
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    // RGB를 HEX 코드로 변환
    return `rgb(${r}, ${g}, ${b})`;
  };

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

    // TODO: 사용자 현재 위치 디자인 변경
    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      if (currentLocation) {
        ctx.beginPath();
        ctx.arc(currentLocation.x, currentLocation.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }
    }

    if (otherLocations) {
      otherLocations.forEach(({ location, token }) => {
        const markerColor = getMarkerColor(token);
        const currentLocation = latLngToCanvasPoint(location);
        if (currentLocation) {
          ctx.beginPath();
          ctx.arc(currentLocation.x, currentLocation.y, 10, 0, 2 * Math.PI);
          ctx.fillStyle = markerColor;
          ctx.fill();
        }
      });
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths }) => {
        const startLoctaion = latLngToCanvasPoint(startPoint);
        if (startLoctaion && startImageRef.current) {
          const markerSize = map.getZoom() * 2;
          ctx.drawImage(
            startImageRef.current,
            startLoctaion.x - markerSize / 2,
            startLoctaion.y - markerSize,
            markerSize,
            markerSize,
          );
        }
        const endLocation = latLngToCanvasPoint(endPoint);
        if (endLocation && endImageRef.current) {
          const markerSize = map.getZoom() * 2;
          ctx.drawImage(
            endImageRef.current,
            endLocation.x - markerSize / 2,
            endLocation.y - markerSize,
            markerSize,
            markerSize,
          );
        }
        if (paths?.length > 0) {
          ctx.beginPath();
          const firstPoint = latLngToCanvasPoint(paths[0]);

          if (firstPoint) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            for (let i = 1; i < paths?.length; i++) {
              const point = latLngToCanvasPoint(paths[i]);
              if (point) {
                ctx.lineTo(point.x, point.y);
              }
            }
            ctx.stroke();
          }
        }
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!map) return;

    const zoomChange = e.deltaY < 0 ? 1 : -1;

    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + zoomChange);

    redrawCanvas();
  };

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
  }, [guests, otherLocations, lat, lng, map]);

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
      <div ref={mapRef} id="map" style={{ width, height }} />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
};
