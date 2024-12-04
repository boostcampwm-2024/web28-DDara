import { useEffect, useState } from 'react';

interface IAlertProps {
  message: string;
  duration?: number; // ms 단위
  autoClose?: boolean;
  onClose?: () => void;
}

export const AlertUI = ({ message, duration = 3000, autoClose = true, onClose }: IAlertProps) => {
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    if (!autoClose) return;

    const timeout = setTimeout(() => {
      setAnimateProgress(true);
    }, 50);

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, [duration, autoClose, onClose]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[5000] flex items-center justify-center bg-black bg-opacity-20" />
      <div className="bg-blueGray-800 absolute left-1/2 top-1/2 z-[6000] mx-auto flex w-[22rem] max-w-md -translate-x-1/2 flex-col items-center justify-center rounded-md p-6 text-white shadow-lg">
        <div className="whitespace-pre text-center text-sm font-medium">{message}</div>
        {autoClose ? (
          <div className="bg-blueGray-800 mt-4 h-1 w-full overflow-hidden">
            <div
              className="linear transition-all` h-1 rounded-full bg-white"
              style={{
                width: animateProgress ? '0%' : '100%',
                transitionDuration: `${duration}ms`,
              }}
            />
          </div>
        ) : (
          <button onClick={onClose} className="cursor-pointer rounded-md bg-white">
            닫기
          </button>
        )}
      </div>
    </>
  );
};
