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

enum MARKER_TYPE {
  START_MARKER = 'START_MARKER',
  END_MARKER = 'END_MARKER',
  CHARACTER = 'CHARACTER',
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

  // 캔버스에서 이미지 그리고, 캔버스 전체 색상 변경 후에 반환하는 함수
  const colorizeImage = (
    image: HTMLImageElement,
    color: string,
    width: number,
    height: number,
  ): HTMLCanvasElement => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;

    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return tempCanvas;

    // 원본 이미지 그리기
    tempCtx.drawImage(image, 0, 0, width, height);

    // 색상 적용
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, width, height);

    return tempCanvas;
  };

  const drawMarker = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number } | null,
    image: HTMLImageElement | null,
    zoom: number,
    rotate: number,
    color: string,
    markerType: MARKER_TYPE,
  ) => {
    if (point && image) {
      let markerSize;
      if (markerType === MARKER_TYPE.CHARACTER) {
        markerSize = zoom < 18 ? Math.min(zoom * 6, 60) : (zoom - 15) * (zoom - 16) * 15;
      } else {
        markerSize = zoom < 18 ? Math.min(zoom * 4, 40) : (zoom - 15) * (zoom - 14) * 5;
      }

      ctx.save();
      ctx.translate(point.x, point.y - zoom);
      ctx.rotate(rotate);
      let filteredImage;
      if (markerType === MARKER_TYPE.CHARACTER) {
        filteredImage = image;
      } else {
        filteredImage = colorizeImage(image, color, markerSize, markerSize);
      }
      ctx.drawImage(filteredImage, -markerSize / 2, -markerSize / 2, markerSize, markerSize);
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

    ctx.save();

    ctx.beginPath();
    ctx.arc(point.x, point.y + zoom + 1, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;
    ctx.fill();

    ctx.restore();
  };

  const drawPath = (ctx: CanvasRenderingContext2D, points: ILatLng[], color: string) => {
    if (points.length === 0 || !footprintRef.current || !map) return;

    const footprintImage = footprintRef.current;
    const markerSize = Math.min(map.getZoom() * 2, 20);

    const offscreenCanvas = colorizeImage(footprintImage, color, markerSize, markerSize);

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

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.drawImage(offscreenCanvas, -markerSize / 2, -markerSize / 2);
        ctx.restore();
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
      drawMarker(
        ctx,
        startPoint,
        startImageRef.current,
        zoom,
        0,
        START_MARKER_COLOR,
        MARKER_TYPE.START_MARKER,
      );
    }

    if (endMarker) {
      const endPoint = latLngToCanvasPoint(endMarker);
      drawMarker(
        ctx,
        endPoint,
        endImageRef.current,
        zoom,
        0,
        END_MARKER_COLOR,
        MARKER_TYPE.END_MARKER,
      );
    }

    if (pathPoints) {
      drawPath(ctx, pathPoints, PATH_COLOR);
    }

    if (guests) {
      guests.forEach(({ startPoint, endPoint, paths, markerStyle }) => {
        const startLocation = latLngToCanvasPoint(startPoint);
        drawMarker(
          ctx,
          startLocation,
          startImageRef.current,
          zoom,
          0,
          markerStyle.color,
          MARKER_TYPE.START_MARKER,
        );

        const endLocation = latLngToCanvasPoint(endPoint);
        drawMarker(
          ctx,
          endLocation,
          endImageRef.current,
          zoom,
          0,
          markerStyle.color,
          MARKER_TYPE.END_MARKER,
        );

        drawPath(ctx, paths, markerStyle.color);
      });
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
          MARKER_TYPE.CHARACTER,
        );
      } else {
        drawMarker(
          ctx,
          currentLocation,
          character1Ref.current,
          zoom,
          0,
          guests![0]?.markerStyle.color,
          MARKER_TYPE.CHARACTER,
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
          MARKER_TYPE.CHARACTER,
        );
      });
    }
  };

  return { redrawCanvas };
};
