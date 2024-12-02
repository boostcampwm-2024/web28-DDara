import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface IToastAlertProps {
  message: string;
  duration: number;
  onClose: () => void;
}

export const ToastAlert = (props: IToastAlertProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = performance.now();

    const updateProgress = (current: number) => {
      const elapsed = current - start;
      const newProgress = Math.max(0, 100 - (elapsed / props.duration) * 100);

      setProgress(newProgress);

      if (elapsed < props.duration) {
        requestAnimationFrame(updateProgress);
      } else {
        props.onClose?.();
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [props.duration, props.onClose]);

  return (
    <div className="animate-smoothAppear bg-blueGray-800 absolute left-0 right-0 top-5 z-[6000] mx-auto w-80 transform flex-col items-center justify-center gap-3 rounded-md p-4 text-white shadow-lg">
      <div className="whitespace-pre-line break-words text-center text-xs font-medium">
        {props.message}
      </div>
      <div
        className="mt-2 h-1 w-full rounded-full bg-white transition-all ease-linear"
        style={{ width: `${progress}%` }}
      />
      <button onClick={props.onClose} className="absolute right-3 top-3 cursor-pointer">
        <IoClose className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};
