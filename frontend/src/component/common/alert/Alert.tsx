import { useEffect, useState } from 'react';

interface IAlertProps {
  message: string;
  duration?: number;
  autoClose?: boolean;
  onClose?: () => void;
}

export const AlertUI = ({ message, duration = 1000, autoClose = true, onClose }: IAlertProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoClose) return;

    const interval = duration / 100;
    const timer = setInterval(() => {
      setProgress(prev => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          clearInterval(timer);
          onClose?.();
        }
        return newValue;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, autoClose, onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black bg-opacity-20" />
      <div className="bg-blueGray-600 absolute left-1/2 top-1/2 z-[6000] mx-auto flex h-[6%] w-[22rem] max-w-md -translate-x-1/2 flex-col items-center justify-center rounded-md p-4 text-white shadow-lg">
        <div className="text-center text-sm font-medium">{message}</div>
        {autoClose ? (
          <div className="bg-blueGray-600 mt-2 h-1 w-full overflow-hidden rounded-full">
            <div
              className="h-full bg-white transition-all ease-linear"
              style={{ width: `${progress}%` }}
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
