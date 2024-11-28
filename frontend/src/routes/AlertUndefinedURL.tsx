import { Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AlertUI } from '@/component/common/alert/Alert.tsx';

export const AlertUndefinedURL = () => {
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  if (shouldRedirect) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      {showAlert && (
        <AlertUI
          message="잘못된 경로입니다. 메인페이지로 이동합니다."
          duration={3000}
          autoClose
          onClose={() => {
            setShowAlert(false);
            setShouldRedirect(true);
          }}
        />
      )}
      <article className="flex h-screen w-full flex-col items-center justify-center gap-3 text-2xl">
        <div>잘못된 경로입니다.</div>
        <div>메인 페이지로 이동합니다.</div>
      </article>
    </>
  );
};