import { useRef, useEffect, RefObject } from 'react';
import {
  END_MARKER_COLOR,
  LINE_WIDTH,
  PATH_COLOR,
  START_MARKER_COLOR,
  STROKE_STYLE,
} from '@/lib/constants/canvasConstants.ts';

import startmarker from '@/assets/startmarker.svg';
import endmarker from '@/assets/endmarker.svg';
import mylocation from '@/assets/mylocation.svg';
import character1 from '@/assets/character1.png';
import character2 from '@/assets/character2.png';
import { IMarkerStyle } from '@/lib/types/canvasInterface.ts';

interface ILatLng {
  lat: number;
  lng: number;
}

interface ILatLngAlpha {
  lat: number;
  lng: number;
  alpha: number;
}

interface IOtherLocation {
  location: ILatLngAlpha;
  color: string;
}

interface IGuest {
  startPoint: ILatLng;
  endPoint: ILatLng;
  paths: ILatLng[];
  markerStyle: IMarkerStyle;
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
  alpha?: number | null;
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
  alpha = 0,
}: IUseRedrawCanvasProps) => {
  const startImageRef = useRef<HTMLImageElement | null>(null);
  const endImageRef = useRef<HTMLImageElement | null>(null);
  const mylocationRef = useRef<HTMLImageElement | null>(null);
  const character1Ref = useRef<HTMLImageElement | null>(null);
  const character2Ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    startImageRef.current = new Image();
    startImageRef.current.src = startmarker;

    endImageRef.current = new Image();
    endImageRef.current.src = endmarker;

    mylocationRef.current = new Image();
    mylocationRef.current.src = mylocation;

    character1Ref.current = new Image();
    character1Ref.current.src = character1;

    character2Ref.current = new Image();
    character2Ref.current.src = character2;
  }, []);

  const drawMarker = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    image: HTMLImageElement | null,
    zoom: number,
    rotate: number,
    color: string,
  ) => {
    if (point && image) {
      const markerSize = zoom * 5;
      ctx.fillStyle = color || '#000';
      ctx.strokeStyle = color || '#000';
      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(rotate);
      ctx.drawImage(image, -markerSize / 2, -markerSize / 2, markerSize, markerSize);
      ctx.restore();
    }
  };

  // eslint-disable-next-line no-shadow
  const hexToRgba = (hex: string, alpha: number) => {
    // eslint-disable-next-line no-param-reassign
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
      // eslint-disable-next-line no-param-reassign
      hex = hex
        .split('')
        .map(char => char + char)
        .join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const drawNeonCircleAndDirection = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    zoom: number,
    color: string,
  ) => {
    if (!point) return;

    const radius = zoom * 3;
    const gradient = ctx.createRadialGradient(
      point.x,
      point.y + zoom,
      0,
      point.x,
      point.y + zoom,
      radius,
    );

    const alphaStart = 0.75;
    const alphaEnd = 0;

    gradient.addColorStop(0, hexToRgba(color || '#3498db', alphaStart));
    gradient.addColorStop(1, hexToRgba(color || '#3498db', alphaEnd));

    ctx.beginPath();
    ctx.arc(point.x, point.y + zoom + 1, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.save();

    ctx.restore();
  };

  const drawPath = (ctx: CanvasRenderingContext2D, points: ILatLng[], color: string) => {
    if (points.length === 0) return;
    ctx.fillStyle = color || '#000';
    ctx.strokeStyle = color || '#000';

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

    // 호스트가 게스트 경로 그릴때 쓰이는 디자인
    const zoom = map.getZoom();
    if (startMarker) {
      const startPoint = latLngToCanvasPoint(startMarker);
      drawMarker(ctx, startPoint, startImageRef.current, zoom, 0, START_MARKER_COLOR);
    }

    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      drawMarker(ctx, endPoint, endImageRef.current, zoom, 0, END_MARKER_COLOR);
    }

    if (pathPoints) {
      drawPath(ctx, pathPoints, PATH_COLOR);
    }

    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      if (alpha) {
        drawMarker(
          ctx,
          currentLocation,
          character1Ref.current,
          zoom,
          (alpha * Math.PI) / 180,
          guests![0]?.markerStyle.color,
        );
      } else {
        drawMarker(
          ctx,
          currentLocation,
          character1Ref.current,
          zoom,
          0,
          guests![0]?.markerStyle.color,
        );
      }
    }

    if (otherLocations) {
      otherLocations.forEach(({ location, color }) => {
        const locationPoint = latLngToCanvasPoint({
          lat: location.lat ? location.lat : 0,
          lng: location.lng ? location.lng : 0,
        });

        drawNeonCircleAndDirection(ctx, locationPoint, zoom, color);
        drawMarker(
          ctx,
          locationPoint,
          character2Ref.current,
          zoom,
          (location.alpha * Math.PI) / 180,
          color,
        );
      });
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths, markerStyle }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        drawMarker(ctx, startLocation, startImageRef.current, zoom, 0, markerStyle.color);

        const endLocation = latLngToCanvasPoint(endPoint);
        drawMarker(ctx, endLocation, endImageRef.current, zoom, 0, markerStyle.color);

        drawPath(ctx, paths, markerStyle.color);
      });
    }
  };

  return { redrawCanvas };
};
