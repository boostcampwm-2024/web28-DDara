import React, { useState, useRef } from 'react';
import { MdClear } from 'react-icons/md';
import { SetCurruntLocationButton } from '../setCurrentLocationButton/SetCurrentLocationButton';

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

  const handleClose = () => {
    setSheetHeight(minHeight);
  };

  return (
    <div
      className="transition-height absolute bottom-0 left-0 right-0 overflow-hidden rounded-t-2xl bg-white shadow-lg duration-700 ease-out"
      style={{
        backgroundColor: `${backgroundColor}`,
        height: `${sheetHeight * 100}vh`,
      }}
    >
      <div className="absolute top-0">
        <SetCurruntLocationButton map={map} lat={lat} lng={lng} isMain />
      </div>

      <div
        className="flex items-center justify-center pb-6 pt-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="absolute right-2 top-2">
        <button
          onClick={handleClose}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200"
        >
          <MdClear size={18} color="grayscale-850" />
        </button>
      </div>

      <div className="h-[calc(100%-60px)] overflow-auto pb-5">{children}</div>
    </div>
  );
};
