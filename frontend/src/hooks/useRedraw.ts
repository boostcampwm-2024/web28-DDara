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

  const drawMarker = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    image: HTMLImageElement | null,
    zoom: number,
  ) => {
    if (point && image) {
      const markerSize = zoom * 2;
      ctx.drawImage(image, point.x - markerSize / 2, point.y - markerSize, markerSize, markerSize);
    }
  };

  const drawPath = (ctx: CanvasRenderingContext2D, points: ILatLng[]) => {
    if (points.length === 0) return;

    ctx.beginPath();
    const firstPoint = latLngToCanvasPoint(points[0]);
    if (firstPoint) {
      ctx.moveTo(firstPoint.x, firstPoint.y);
      for (let i = 1; i < points.length; i++) {
        const point = latLngToCanvasPoint(points[i]);
        if (point) {
          ctx.lineTo(point.x, point.y);
        }
      }
      ctx.stroke();
    }
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    color: string,
    radius: number,
  ) => {
    if (point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  };

  const getMarkerColor = (token: string): string => {
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

    const zoom = map.getZoom();
    if (startMarker) {
      const startPoint = latLngToCanvasPoint(startMarker);
      drawMarker(ctx, startPoint, startImageRef.current, zoom);
    }

    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      drawMarker(ctx, endPoint, endImageRef.current, zoom);
    }

    if (pathPoints) {
      drawPath(ctx, pathPoints);
    }

    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      drawCircle(ctx, currentLocation, 'blue', 10);
    }

    if (otherLocations) {
      otherLocations.forEach(({ location, token }) => {
        const markerColor = getMarkerColor(token);
        const locationPoint = latLngToCanvasPoint(location);
        drawCircle(ctx, locationPoint, markerColor, 10);
      });
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        drawMarker(ctx, startLocation, startImageRef.current, zoom);

        const endLocation = latLngToCanvasPoint(endPoint);
        drawMarker(ctx, endLocation, endImageRef.current, zoom);

        drawPath(ctx, paths);
      });
    }
  };

  return { redrawCanvas };
};
