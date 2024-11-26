import React, { useState, useRef } from 'react';

interface IBottomSheetProps {
  minHeight: number;
  maxHeight: number;
  children: React.ReactNode;
}

export const BottomSheet = ({ minHeight, maxHeight, children }: IBottomSheetProps) => {
  const [sheetHeight, setSheetHeight] = useState(minHeight);
  const startY = useRef(0);
  const startHeight = useRef(minHeight);

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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white shadow-lg transition-transform duration-700 ease-out"
      style={{
        height: `${sheetHeight * 100}vh`,
        transform: `translateY(${(1 - sheetHeight) * 100}%)`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-center pb-1 pt-2">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>

      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
};