import { useRef, useEffect, RefObject } from 'react';
import { LINE_WIDTH, STROKE_STYLE } from '@/lib/constants/canvasConstants.ts';

import startmarker from '@/assets/startmarker.svg';
import endmarker from '@/assets/endmarker.svg';
import mylocation from '@/assets/mylocation.svg';
import character1 from '@/assets/character1.png';
import character2 from '@/assets/character2.png';
import { IMarkerStyle } from '@/lib/types/canvasInterface.ts';
import footprint from '@/assets/footprint.svg';

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
  const footprintRef = useRef<HTMLImageElement | null>(null);

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

    footprintRef.current = new Image();
    footprintRef.current.src = footprint;
  }, []);

  const drawMarker = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    image: HTMLImageElement | null,
    zoom: number,
    rotate: number,
  ) => {
    if (point && image) {
      const markerSize = zoom * 5;
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

  const drawPath = (ctx: CanvasRenderingContext2D, points: ILatLng[]) => {
    if (points.length === 0 || !character1Ref.current) return;

    const footprintImage = footprintRef.current;

    for (let i = 0; i < points.length - 1; i++) {
      const start = latLngToCanvasPoint(points[i]);
      const end = latLngToCanvasPoint(points[i + 1]);

      /* eslint-disable no-continue */
      if (!start || !end) {
        continue;
      }

      const angle = Math.atan2(end.y - start.y, end.x - start.x);

      const distance = 30;
      const totalDistance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
      const steps = Math.floor(totalDistance / distance);

      for (let j = 0; j < steps; j++) {
        const progress = j / steps;
        const x = start.x + progress * (end.x - start.x);
        const y = start.y + progress * (end.y - start.y);

        if (footprintImage && map) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          const markerSize = Math.min(map.getZoom() * 2, 20);
          ctx.drawImage(footprintImage, -markerSize / 2, -markerSize / 2, markerSize, markerSize);
          ctx.restore();
        }
      }
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

    const zoom = map.getZoom();
    if (startMarker) {
      const startPoint = latLngToCanvasPoint(startMarker);
      drawMarker(ctx, startPoint, startImageRef.current, zoom, 0);
    }

    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      drawMarker(ctx, endPoint, endImageRef.current, zoom, 0);
    }

    if (pathPoints) {
      drawPath(ctx, pathPoints);
    }

    if (lat && lng) {
      const currentLocation = latLngToCanvasPoint({ lat, lng });
      if (alpha) {
        drawMarker(ctx, currentLocation, character1Ref.current, zoom, (alpha * Math.PI) / 180);
      } else {
        drawMarker(ctx, currentLocation, character1Ref.current, zoom, 0);
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
        );
      });
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        drawMarker(ctx, startLocation, startImageRef.current, zoom, 0);

        const endLocation = latLngToCanvasPoint(endPoint);
        drawMarker(ctx, endLocation, endImageRef.current, zoom, 0);

        drawPath(ctx, paths);
      });
    }
  };

  return { redrawCanvas };
};
