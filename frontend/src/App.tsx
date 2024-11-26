import { IndexRoutes } from '@/routes/IndexRoutes.tsx';
import 'App.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileScreen = window.innerWidth <= 768;

      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );

      setIsMobile(isMobileScreen || isMobileDevice);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (!isMobile) {
    return (
      <>
        <div className="overlay">
          <div className="message">
            모바일로 접속해주세요! <span>많은 관심 감사합니다.</span>
            <span>데스크탑 버전은 추후 업데이트될 예정이니 조금만 기다려주세요!</span>
          </div>
        </div>
        <IndexRoutes />
      </>
    );
  }
  return <IndexRoutes />;
};
