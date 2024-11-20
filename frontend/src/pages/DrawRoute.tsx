import { MdArrowBack } from 'react-icons/md';
import { Linedrawer } from '@/component/linedrawer/Linedrawer';

export const DrawRoute = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="z-10 flex flex-col bg-white p-4">
        <div className="flex items-center">
          <button className="text-gray-700">
            <MdArrowBack size={24} />
          </button>
          <div className="ml-4 text-lg">
            <span className="font-bold">사용자1</span> 에 대한 경로 설정
          </div>
        </div>
        <span className="text-sm text-gray-600">
          사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다
        </span>
      </header>
      <Linedrawer />
    </div>
  );
};
