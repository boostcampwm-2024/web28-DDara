import { useEffect, useState } from 'react';
import { MapCanvas } from '@/component/maps/MapCanvas.tsx';
import { DEFAULT_CENTER } from '@/lib/constants/mapConstants.ts';

export const FullScreenMap = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
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
    <div className="fixed inset-0 h-full w-full">
      <MapCanvas
        width={windowSize.width}
        height={windowSize.height}
        initialCenter={DEFAULT_CENTER}
        initialZoom={7}
      />
    </div>
  );
};
