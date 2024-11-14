import { Header } from '@/component/Layout/header/Header.tsx';
// import { MdInfo } from 'react-icons/md';
import { NaverMap } from '@/component/maps/NaverMap.tsx';

export const GuestView = () => {
  // // TODO: 헤더 테스트 로직 추후 범용 Header로 제작시 제거 예정
  // // Todo: 사용자 경로 받는 로직이 필요함. 우선은 하드코딩해두고 나중에 수정
  // // Todo: Header를 좀 더 범용적으로 가져갈 필요가 있음
  // const title = (
  //   <h1 className="flex items-center justify-center font-normal text-gray-400">
  //     <span className="font-semibold text-gray-900">사용자 1</span>에 대한 경로 설정
  //   </h1>
  // );
  //
  // // Todo: subtitle의 span에 대해서 묘하게 수직 정렬 안맞는 수정 필요
  // const subTitle = (
  //   <div className="flex items-center gap-0.5 pl-2.5 text-xs font-normal text-gray-400">
  //     <MdInfo className="h-3 w-3 text-black" />
  //     <span>사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다.</span>
  //   </div>
  // );

  return (
    <>
      <Header />
      <div className="h-screen">
        <NaverMap lat={37.3595704} lng={127.105399} zoom={3} />
      </div>
    </>
  );
};
