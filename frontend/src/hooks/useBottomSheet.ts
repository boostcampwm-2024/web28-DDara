import { useRef, useEffect } from 'react';

interface IUseBottomSheet {
  minHeight: number;
  maxHeight: number;
}

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

/**
 * `useBottomSheet` 훅은 하단에서 올라오는 Bottom Sheet의 드래그 동작을 제어합니다.
 *
 * @param {IUseBottomSheet} props - Bottom Sheet의 최소 및 최대 높이 비율을 포함한 설정
 * @param {number} props.minHeight - Bottom Sheet의 최소 높이 비율 (0.0 - 1.0).
 * @param {number} props.maxHeight - Bottom Sheet의 최대 높이 비율 (0.0 - 1.0).
 * @returns {{ sheet: React.RefObject<HTMLDivElement>, content: React.RefObject<HTMLDivElement> }} - Bottom Sheet와 콘텐츠 영역의 참조 객체를 반환합니다.
 *
 * @remarks
 * - `minHeight`와 `maxHeight`는 각각 Bottom Sheet가 닫힌 상태와 열린 상태의 높이를 화면 비율로 나타냅니다.
 * - 드래그 동작을 통해 Bottom Sheet의 위치를 제어하며, 드래그 종료 시 스냅 애니메이션이 적용됩니다.
 *
 * @example
 * ```tsx
 * const { sheet, content } = useBottomSheet({ minHeight: 0.5, maxHeight: 0.85 });
 *
 * return (
 *   <div ref={sheet} className="bottom-sheet">
 *     <div ref={content} className="content">
 *       <p>Bottom Sheet 콘텐츠</p>
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useBottomSheet(props: IUseBottomSheet) {
  const MIN_Y = window.innerHeight * props.minHeight;
  const MAX_Y = window.innerHeight * props.maxHeight;

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
