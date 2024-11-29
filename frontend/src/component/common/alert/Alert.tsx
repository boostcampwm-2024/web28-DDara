import { useEffect, useState } from 'react';

interface IAlertProps {
  message: string;
  duration?: number; // ms 단위
  autoClose?: boolean;
  onClose?: () => void;
}

export const AlertUI = ({ message, duration = 3000, autoClose = true, onClose }: IAlertProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoClose) return;

    const start = performance.now();

    const updateProgress = (current: number) => {
      const elapsed = current - start;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);

      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        onClose?.();
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, autoClose, onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black bg-opacity-20" />
      <div className="bg-blueGray-800 absolute left-1/2 top-1/2 z-[6000] mx-auto flex w-[22rem] max-w-md -translate-x-1/2 flex-col items-center justify-center rounded-md p-6 text-white shadow-lg">
        <div className="whitespace-pre text-center text-sm font-medium">{message}</div>
        {autoClose ? (
          <div className="bg-blueGray-800 mt-4 h-1 w-full">
            <div
              className="h-1 rounded-full bg-white transition-all ease-linear"
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
