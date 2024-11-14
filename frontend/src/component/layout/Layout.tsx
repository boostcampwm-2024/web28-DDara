import { Outlet } from 'react-router-dom';
import { LayoutHeader } from '@/component/layout/header/LayoutHeader.tsx';
import { LayoutHeaderProvider } from '@/component/layout/header/LayoutHeaderProvider.tsx';
import { Footer } from './Footer';

interface ILayoutProps {
  footerTitle?: string;
  footerActive?: boolean;
  handleFooterClick?: () => void;
  footerTransperency?: boolean;
}

export const Layout = (props: ILayoutProps) => {
  return (
    <>
      <LayoutHeaderProvider>
        <LayoutHeader />

        <main>
          <Outlet />
        </main>
      </LayoutHeaderProvider>

      {/* TODO : 이동율 - Footer 수정 요청 */}
      <Footer
        title={props.footerTitle}
        onClick={props.handleFooterClick}
        active={props.footerActive}
        isTranperency={props.footerTransperency}
      />
    </>
  );
};
