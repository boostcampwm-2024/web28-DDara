import { useRef, useEffect } from 'react';
import { MIN_Y, MAX_Y } from '@/component/bottomsheet/BottomSheetOption';

interface IBottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
}

export function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<IBottomSheetMetrics>({
    touchStart: { sheetY: 0, touchY: 0 },
    touchMove: { prevTouchY: 0, movingDirection: 'none' },
    isContentAreaTouched: false,
  });

  const getClientY = (e: TouchEvent | MouseEvent) => {
    return e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
  };

  const handleMove = (e: TouchEvent | MouseEvent) => {
    const { touchStart, touchMove } = metrics.current;
    const clientY = getClientY(e);

    touchMove.prevTouchY = clientY;
    touchMove.movingDirection = clientY > touchStart.touchY ? 'down' : 'up';

    const deltaY = clientY - touchStart.touchY;
    const nextY = Math.min(MAX_Y, Math.max(MIN_Y, touchStart.sheetY + deltaY));
    sheet.current!.style.transform = `translateY(${nextY - MAX_Y}px)`;
  };

  const handleEnd = () => {
    const { touchMove } = metrics.current;
    const currentY = sheet.current!.getBoundingClientRect().y;

    if (touchMove.movingDirection === 'up' && currentY < (MIN_Y + MAX_Y) / 2) {
      sheet.current!.style.transform = `translateY(${MIN_Y - MAX_Y}px)`;
    } else {
      sheet.current!.style.transform = `translateY(0px)`;
    }

    document.body.style.overflowY = 'auto';

    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleEnd);

    metrics.current = {
      touchStart: { sheetY: 0, touchY: 0 },
      touchMove: { prevTouchY: 0, movingDirection: 'none' },
      isContentAreaTouched: false,
    };
  };

  useEffect(() => {
    const handleStart = (e: TouchEvent | MouseEvent) => {
      const clientY = getClientY(e);
      metrics.current.touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      metrics.current.touchStart.touchY = clientY;

      document.body.style.overflowY = 'hidden';

      if (e instanceof MouseEvent) {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
      }
    };

    sheet.current?.addEventListener('touchstart', handleStart);
    sheet.current?.addEventListener('touchmove', handleMove);
    sheet.current?.addEventListener('touchend', handleEnd);

    sheet.current?.addEventListener('mousedown', handleStart);

    return () => {
      sheet.current?.removeEventListener('touchstart', handleStart);
      sheet.current?.removeEventListener('touchmove', handleMove);
      sheet.current?.removeEventListener('touchend', handleEnd);

      sheet.current?.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
    };
  }, []);

  return { sheet, content };
}
