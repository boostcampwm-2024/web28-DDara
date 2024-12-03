import React, { useContext, useEffect, useRef, useState } from 'react';
import { ButtonState } from '@/component/common/enums';
import classNames from 'classnames';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
import { FloatingButton } from '@/component/common/floatingbutton/FloatingButton.tsx';
import { useFloatingButton } from '@/hooks/useFloatingButton.ts';
import { ICanvasPoint, IMapCanvasProps, IPoint } from '@/lib/types/canvasInterface.ts';
import { useUndoRedo } from '@/hooks/useUndoRedo.ts';
import { CurrentUserContext } from '@/context/CurrentUserContext';
import { ToolDescription } from '@/component/tooldescription/ToolDescription';
import { SearchBox } from '@/component/searchbox/SearchBox';
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';
import { ZoomSlider } from '@/component/zoomslider/ZoomSlider';
import { useRedrawCanvas } from '@/hooks/useRedraw';

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

  const { isMenuOpen, toolType, toggleMenu, handleMenuClick } = useFloatingButton();
  const { pathPoints, addPoint, undo, redo, undoStack, redoStack } = useUndoRedo([]);

  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(prevUser => {
        return {
          ...prevUser,
          start_location: {
            ...prevUser.start_location, // 기존 start_location 유지
            title: prevUser.start_location.title ?? '',
            lat: startMarker?.lat ?? prevUser.start_location.lat,
            lng: startMarker?.lng ?? prevUser.start_location.lng,
          },
          end_location: {
            ...prevUser.end_location, // 기존 end_location 유지
            title: prevUser.end_location.title ?? '',
            lat: endMarker?.lat ?? prevUser.end_location.lat,
            lng: endMarker?.lng ?? prevUser.end_location.lng,
          },
          path: pathPoints, // 경로 포인트들
        };
      });
    };

    updateUser(); // 상태 업데이트 함수 호출
  }, [startMarker, endMarker, pathPoints]); // 필요한 의존성만 포함

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
      mapDataControl: false,
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

  const { redrawCanvas } = useRedrawCanvas({
    canvasRef,
    map,
    latLngToCanvasPoint,
    startMarker,
    endMarker,
    pathPoints,
  });

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
        setCurrentUser(prevUser => ({
          ...prevUser,
          start_location: {
            ...prevUser.start_location,
            title: '', // title을 빈 문자열로 초기화 -> 검색창에 보이게 하려고
            lat: clickedPoint.lat,
            lng: clickedPoint.lng,
          },
        }));
        setStartMarker(clickedPoint);
        break;
      case ButtonState.DESTINATION_MARKER:
        setCurrentUser(prevUser => ({
          ...prevUser,
          end_location: {
            ...prevUser.end_location,
            title: '', // title을 빈 문자열로 초기화 -> 검색창에 보이게 하려고
            lat: clickedPoint.lat,
            lng: clickedPoint.lng,
          },
        }));
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

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging,
  } = useCanvasInteraction(map, canvasRef, redrawCanvas);

  const handleCreateMarker = (point: IPoint) => {
    if (toolType === ButtonState.START_MARKER) {
      setStartMarker(point);
      setCurrentUser(prevUser => ({
        ...prevUser,
        start_location: {
          ...prevUser.start_location,
          title: '',
        },
      }));
    } else {
      setEndMarker(point);
      setCurrentUser(prevUser => ({
        ...prevUser,
        end_location: {
          ...prevUser.end_location,
          title: '',
        },
      }));
    }
  };

  const handleDeleteMarker = () => {
    if (toolType === ButtonState.START_MARKER) setStartMarker(null);
    else setEndMarker(null);
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

  const calculateZoomLevel = (latDiff: number, lngDiff: number) => {
    const maxDiff = Math.max(latDiff, lngDiff);
    if (maxDiff < 0.0005) return 19;
    if (maxDiff < 0.001) return 18;
    if (maxDiff < 0.004) return 17;
    if (maxDiff < 0.01) return 15;
    if (maxDiff < 0.03) return 14;
    if (maxDiff < 0.05) return 13;
    if (maxDiff < 0.1) return 12;
    if (maxDiff < 0.2) return 11;
    if (maxDiff < 0.5) return 10;
    if (maxDiff < 1) return 9;
    if (maxDiff < 2) return 8;
    if (maxDiff < 5) return 7;
    if (maxDiff < 10) return 6;
    return 5;
  };

  useEffect(() => {
    if (startMarker && endMarker) {
      const latitudes = [startMarker.lat, endMarker.lat];
      const longitudes = [startMarker.lng, endMarker.lng];

      const maxLat = Math.max(...latitudes);
      const minLat = Math.min(...latitudes);
      const maxLng = Math.max(...longitudes);
      const minLng = Math.min(...longitudes);

      const centerLat = (maxLat + minLat) / 2;
      const centerLng = (maxLng + minLng) / 2;

      map?.setCenter(new window.naver.maps.LatLng(centerLat, centerLng));

      const latDiff = maxLat - minLat;
      const lngDiff = maxLng - minLng;
      const zoomLevel = calculateZoomLevel(latDiff, lngDiff);

      map?.setZoom(zoomLevel);
    } else {
      if (startMarker) {
        map?.setCenter({ lat: startMarker.lat, lng: startMarker.lng });
        map?.setZoom(15);
      }
      if (endMarker) {
        map?.setCenter({ lat: endMarker.lat, lng: endMarker.lng });
        map?.setZoom(15);
      }
    }
  }, [startMarker, endMarker]);

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
      {(toolType === ButtonState.START_MARKER || toolType === ButtonState.DESTINATION_MARKER) && (
        <div className="relative">
          <SearchBox
            setMarker={handleCreateMarker}
            deleteMarker={handleDeleteMarker}
            startMarker={startMarker}
            endMarker={endMarker}
          />
        </div>
      )}
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
      <div className="relative flex">
        <ToolDescription />
      </div>
      <div
        className="absolute left-2 top-1/2 z-10 flex gap-2"
        style={{
          transform: 'translateY(-50%)',
        }}
      >
        <ZoomSlider map={map} redrawCanvas={redrawCanvas} />
      </div>
    </div>
  );
};
