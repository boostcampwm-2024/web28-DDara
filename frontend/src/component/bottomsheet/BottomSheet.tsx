import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { SetCurrentLocationButton } from '../setCurrentLocationButton/SetCurrentLocationButton';

interface IBottomSheetProps {
  map: naver.maps.Map | null;
  lat: number | null;
  lng: number | null;
  minHeight: number;
  maxHeight: number;
  backgroundColor: string;
  children: React.ReactNode;
}

export const BottomSheet = ({
  map,
  lat,
  lng,
  minHeight,
  maxHeight,
  backgroundColor,
  children,
}: IBottomSheetProps) => {
  const [sheetHeight, setSheetHeight] = useState(minHeight + 0.2);
  const startY = useRef(0);
  const startHeight = useRef(minHeight + 0.2);

  const handleStart = (y: number) => {
    startY.current = y;
    startHeight.current = sheetHeight;
  };

  const handleMove = (y: number) => {
    const deltaY = startY.current - y;
    const newHeight = startHeight.current + deltaY / window.innerHeight;
    setSheetHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const [, setScrollPosition] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleContentTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleContentTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY !== null) {
      const deltaY = e.touches[0].clientY - touchStartY;

      const scrollableElement = e.currentTarget; // 현재 스크롤이 가능한 요소
      const newScrollPosition = scrollableElement.scrollTop - deltaY;

      scrollableElement.scrollTop = newScrollPosition;

      setTouchStartY(e.touches[0].clientY);

      setScrollPosition(newScrollPosition);
    }
  };

  const handleContentTouchEnd = () => {
    setTouchStartY(null);
  };

  return (
    <>
      <div
        className={classNames('absolute bottom-14 z-[5000]')}
        style={{
          height: `${sheetHeight * 100}vh`,
          transition: 'height 0.3s ease-out',
        }}
      >
        <SetCurrentLocationButton map={map} lat={lat} lng={lng} isMain />
      </div>
      <div
        className="transition-height absolute bottom-0 left-0 right-0 overflow-hidden rounded-t-2xl bg-white shadow-lg duration-700 ease-out"
        style={{
          backgroundColor: `${backgroundColor}`,
          height: `${sheetHeight * 100}vh`,
        }}
        onTouchStart={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
        onTouchEnd={e => e.stopPropagation()}
      >
        <div
          className="transition-height absolute bottom-0 left-0 right-0 overflow-hidden rounded-t-2xl bg-white shadow-lg duration-700 ease-out"
          style={{
            backgroundColor: `${backgroundColor}`,
            height: `${sheetHeight * 100}vh`,
          }}
        >
          <div
            className="flex items-center justify-center pb-6 pt-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
          >
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          <div
            className="h-[calc(100%-60px)] overflow-auto pb-5"
            onTouchStart={handleContentTouchStart}
            onTouchMove={handleContentTouchMove}
            onMouseDown={handleContentTouchEnd}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
