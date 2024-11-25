import { useEffect, useState } from 'react';
import { MapCanvas } from '@/component/maps/MapCanvas.tsx';
import { DEFAULT_CENTER } from '@/lib/constants/mapConstants.ts';
import { ICanvasScreenProps } from '@/lib/types/canvasInterface.ts';

export const FullScreenMap = ({ width, height }: ICanvasScreenProps) => {
  const [windowSize, setWindowSize] = useState({
    width,
    height,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width,
        height,
      });
    };

    window.addEventListener('resize', handleResize);

    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <MapCanvas
      width={windowSize.width}
      height={windowSize.height}
      initialCenter={DEFAULT_CENTER}
      initialZoom={7}
    />
  );
};
