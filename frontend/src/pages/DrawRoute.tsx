import { Footer } from '@/component/layout/Footer';
import { Map } from '@/component/maps/Map';
import { MdArrowBack } from 'react-icons/md';
import { Linedrawer } from '@/component/linedrawer/Linedrawer';

const lat = 37.3595704;
const lng = 127.105399;

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

      <div className="relative h-full w-full flex-grow">
        <div className="absolute inset-0">
          <Map lat={lat} lng={lng} type="naver" />
        </div>
        <div className="absolute inset-0 h-max w-full">
          <Linedrawer />
        </div>
      </div>

      <Footer title="사용자 경로 추가 완료" />
    </div>
  );
};
