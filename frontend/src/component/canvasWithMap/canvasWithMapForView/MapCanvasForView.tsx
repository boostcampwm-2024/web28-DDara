import { useEffect, useRef, useState } from 'react';
import { ICanvasPoint, IMapCanvasViewProps, IPoint } from '@/lib/types/canvasInterface.ts';
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';
import { useRedrawCanvas } from '@/hooks/useRedraw';

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
      mapDataControl: false,
    });

    setMap(mapInstance);
    setProjection(mapInstance.getProjection());

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
    otherLocations,
    guests,
    lat,
    lng,
  });

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
