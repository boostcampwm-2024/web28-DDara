import { useState } from 'react';
import { onboardingData } from '@/lib/data/onboardingData.ts';
import { MdClear } from 'react-icons/md';

interface IOnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: IOnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-100">
      <div className="absolute right-3 top-3 z-[6000] flex items-center gap-2">
        <div className="text-sm text-gray-200">튜토리얼 끝내기</div>
        <button
          onClick={onComplete}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200"
        >
          <MdClear size={18} color="grayscale-850" />
        </button>
      </div>

      <div className="relative flex h-screen w-full items-center justify-center">
        <img
          src={`/assets/images/onboarding/slide${onboardingData[currentSlide].id}.png`}
          alt={`Slide ${currentSlide + 1}`}
          className="absolute top-10 mx-auto h-[75vh] object-contain"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      <div className="absolute bottom-2 flex w-[95%] flex-col">
        <div className="flex w-[100%] items-center justify-center text-white">
          <img
            src="/assets/images/onboarding/character.png"
            alt="캐릭터"
            className="max-h-16 w-[15%] object-contain"
          />
          <div
            className="bg-blueGray-200 m-2 flex h-20 w-[85%] items-center justify-center whitespace-pre rounded-lg bg-opacity-[0.5] text-center text-sm leading-relaxed"
            style={{ padding: '1rem 1rem' }}
          >
            {onboardingData[currentSlide].content}
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
          >
            이전
          </button>
          <div className="flex space-x-2">
            {onboardingData.map((slide, index) => (
              <div
                key={slide.id}
                className={`h-1 w-1 rounded-full ${
                  index === currentSlide ? 'bg-blueGray-200' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button onClick={handleNext} className="bg-blueGray-200 rounded px-4 py-2 text-white">
            {currentSlide === onboardingData.length - 1 ? '시작' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};
