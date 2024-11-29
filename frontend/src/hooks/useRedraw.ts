import { useRef, useEffect, RefObject } from 'react';
import { LINE_WIDTH, STROKE_STYLE } from '@/lib/constants/canvasConstants.ts';

import startmarker from '@/assets/startmarker.svg';
import endmarker from '@/assets/endmarker.svg';
import character1 from '@/assets/character1.png';
import character2 from '@/assets/character2.png';

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
  const character1Ref = useRef<HTMLImageElement | null>(null);
  const character2Ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;

    character1Ref.current = new Image();
    character1Ref.current.src = character1;

    character2Ref.current = new Image();
    character2Ref.current.src = character2;
  }, []);

  const drawMarker = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    image: HTMLImageElement | null,
  ) => {
    if (point && image) {
      const markerSize = 32;
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

  // const getMarkerColor = (token: string): string => {
  //   // 문자열 해싱을 통해 고유 숫자 생성
  //   let hash = 0;
  //   for (let i = 0; i < token.length; i++) {
  //     hash = token.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   // 해시 값을 기반으로 RGB 값 생성
  //   const r = (hash >> 16) & 0xff;
  //   const g = (hash >> 8) & 0xff;
  //   const b = hash & 0xff;
  //   // RGB를 HEX 코드로 변환
  //   return `rgb(${r}, ${g}, ${b})`;
  // };

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
      drawMarker(ctx, startPoint, startImageRef.current);
    }

    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      drawMarker(ctx, endPoint, endImageRef.current);
    }

    if (pathPoints) {
      drawPath(ctx, pathPoints);
    }

    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      drawMarker(ctx, currentLocation, character1Ref.current);
    }

    if (otherLocations) {
      otherLocations.forEach(({ location }) => {
        // const markerColor = getMarkerColor(token);
        const locationPoint = latLngToCanvasPoint(location);
        drawMarker(ctx, locationPoint, character2Ref.current);
      });
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        drawMarker(ctx, startLocation, startImageRef.current);

        const endLocation = latLngToCanvasPoint(endPoint);
        drawMarker(ctx, endLocation, endImageRef.current);

        drawPath(ctx, paths);
      });
    }
  };

  return { redrawCanvas };
};
