import { useRef, useEffect, RefObject } from 'react';
import { LINE_WIDTH, STROKE_STYLE } from '@/lib/constants/canvasConstants.ts';
import startmarker from '@/assets/startmarker.png';
import endmarker from '@/assets/endmarker.png';

interface ILatLng {
  lat: number;
  lng: number;
}

interface IOtherLocation {
  location: ILatLng;
  token: string;
}

interface IGuest {
  startPoint: ILatLng;
  endPoint: ILatLng;
  paths: ILatLng[];
}

interface IUseRedrawCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  map: {
    getZoom: () => number;
  } | null;
  latLngToCanvasPoint: (latLng: ILatLng) => { x: number; y: number } | null;
  startMarker?: ILatLng | null;
  endMarker?: ILatLng | null;
  pathPoints?: ILatLng[] | null;
  otherLocations?: IOtherLocation[] | null;
  guests?: IGuest[] | null;
  lat?: number;
  lng?: number;
}

export const useRedrawCanvas = ({
  canvasRef,
  map,
  latLngToCanvasPoint,
  startMarker,
  endMarker,
  pathPoints = [],
  otherLocations = [],
  guests = [],
  lat,
  lng,
}: IUseRedrawCanvasProps) => {
  const startImageRef = useRef<HTMLImageElement | null>(null);
  const endImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;
  }, []);

  const getMarkerColor = (token: string) => {
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      hash = token.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;
    return `rgb(${r}, ${g}, ${b})`;
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

    // MapCanvasForDraw
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

    if (pathPoints && pathPoints.length > 0) {
      ctx.beginPath();
      const firstPoint = latLngToCanvasPoint(pathPoints[0]);
      if (firstPoint) {
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < pathPoints.length; i++) {
          const point = latLngToCanvasPoint(pathPoints[i]);
          if (point) {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }
    }

    // MapCanvasForView
    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      if (currentLocation) {
        ctx.beginPath();
        ctx.arc(currentLocation.x, currentLocation.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }
    }

    if (otherLocations && otherLocations.length > 0) {
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

    if (guests && guests.length > 0) {
      guests.forEach(({ startPoint, endPoint, paths }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        if (startLocation && startImageRef.current) {
          const markerSize = map.getZoom() * 2;
          ctx.drawImage(
            startImageRef.current,
            startLocation.x - markerSize / 2,
            startLocation.y - markerSize,
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

        if (paths.length > 0) {
          ctx.beginPath();
          const firstPoint = latLngToCanvasPoint(paths[0]);
          if (firstPoint) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            for (let i = 1; i < paths.length; i++) {
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

  return { redrawCanvas };
};
