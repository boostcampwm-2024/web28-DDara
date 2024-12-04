import { Navigate, useLocation } from 'react-router-dom';
import { loadLocalData } from '@/utils/common/manageLocalData.ts';
import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { useEffect, useState } from 'react';
import { AlertUI } from '@/component/common/alert/Alert.tsx';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const token = loadLocalData(AppConfig.KEYS.LOGIN_TOKEN);

  useEffect(() => {
    if (!token) {
      setShowAlert(true);
    }
  }, [token]);

  if (!token && shouldRedirect) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      {showAlert && (
        <AlertUI
          message="로그인되지 않았습니다. 메인 페이지에서 로그인해주세요."
          duration={3000}
          autoClose
          onClose={() => {
            setShowAlert(false);
            setShouldRedirect(true);
          }}
        />
      )}
      {children}
    </>
  );
};
