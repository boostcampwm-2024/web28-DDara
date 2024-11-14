import { Outlet } from 'react-router-dom';
import { Header } from '@/component/Layout/header/Header.tsx';
import { MdInfo } from 'react-icons/md';
import { Footer } from './Footer';

interface ILayoutProps {
  footerTitle?: string;
  footerActive?: boolean;
  handleFooterClick?: () => void;
}

// Todo: 페이지별 다른 Header 설정을 위한 의존성에 대한 논의 및 수정 필요 (현재: 하드코딩된 값이 삽입 중)
export const Layout = (props: ILayoutProps) => {
  // Todo: Z-index convention에 대한 논의 필요 (현재: 하드코딩된 값)
  return (
    <>
      <Header className="z-[1000]">
        <Header.MainLayout
          leftButton="back"
          rightButton="dropdown"
          title={<div>사용자 1의 시나리오</div>}
        />
        <Header.Subtitle>
          <div className="flex items-center gap-0.5 pl-2.5 text-xs font-normal text-gray-400">
            <MdInfo className="h-3 w-3 text-black" />
            <span>사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다.</span>
          </div>
        </Header.Subtitle>
      </Header>

      <main>
        <Outlet />
      </main>

      <Footer
        title={props.footerTitle}
        onClick={props.handleFooterClick}
        active={props.footerActive}
      />
    </>
  );
};
