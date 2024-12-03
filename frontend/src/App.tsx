import { IndexRoutes } from '@/routes/IndexRoutes.tsx';
import 'App.css';
import { useEffect, useState } from 'react';
import { loadLocalData, saveLocalData } from '@/utils/common/manageLocalData.ts';
import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { Onboarding } from '@/component/onBoarding/Onboarding.tsx';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === '/') {
      const firstVisit = loadLocalData(AppConfig.KEYS.FIRST_VISIT);
      if (firstVisit === null) {
        saveLocalData(AppConfig.KEYS.FIRST_VISIT, 'true');
        setIsFirstVisit(true);
      } else if (firstVisit === 'true') {
        setIsFirstVisit(true);
      } else {
        setIsFirstVisit(false);
      }
    } else {
      setIsFirstVisit(false);
    }
  }, [location.pathname]);

  const handleOnboardingComplete = () => {
    saveLocalData(AppConfig.KEYS.FIRST_VISIT, 'false');
    setIsFirstVisit(false);
  };

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

  if (isFirstVisit && location.pathname === '/') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <IndexRoutes />;
};
