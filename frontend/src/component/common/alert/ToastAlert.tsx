import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface IToastAlertProps {
  message: string;
  duration?: number | null; // duration을 선택적 속성으로 변경
  onClose: () => void;
}

export const ToastAlert = ({
  message,
  duration = null, // 기본값을 null로 설정
  onClose,
}: IToastAlertProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration == null) return; // duration이 null이면 자동 닫힘 로직 실행 안 함

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
  }, [duration, onClose]);

  return (
    <div className="animate-smoothAppear bg-blueGray-800 absolute left-0 right-0 top-5 z-[6000] mx-auto w-80 transform flex-col items-center justify-center gap-3 rounded-md p-4 text-white shadow-lg">
      <div className="whitespace-pre-line break-words text-center text-xs font-medium">
        {message}
      </div>
      {duration != null && ( // duration이 있을 때만 진행바 표시
        <div
          className="mt-2 h-1 w-full rounded-full bg-white transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      )}
      <button onClick={onClose} className="absolute right-3 top-3 cursor-pointer">
        <IoClose className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};
