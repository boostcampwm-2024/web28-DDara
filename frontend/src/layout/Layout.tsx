import { Outlet } from 'react-router-dom';
import { LayoutHeader } from '@/layout/header/LayoutHeader.tsx';
import { HeaderDropdownProvider } from '@/component/header/HeaderDropdownProvider.tsx';
import { LayoutFooterProvider } from '@/layout/footer/LayoutFooterProvider.tsx';
import { ToggleProvider } from '@/context/DropdownContext.tsx';
import { LayoutFooter } from './footer/LayoutFooter.tsx';

export const Layout = () => {
  return (
    <ToggleProvider>
      <HeaderDropdownProvider>
        <main>
          {/* LayoutHeader는 HeaderContext를 사용하므로 LayoutHeaderProvider로 감쌈 */}
          <LayoutHeader />

          {/* LayoutFooterProvider로 Outlet을 감싸서 FooterContext도 제공 */}
          <LayoutFooterProvider>
            <Outlet />
            <LayoutFooter />
          </LayoutFooterProvider>
        </main>
      </HeaderDropdownProvider>
    </ToggleProvider>
  );
};
