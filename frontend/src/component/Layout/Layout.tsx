import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface ILayoutProps {
  children: ReactNode;
  headerTitle?: string;
  footerTitle?: string;
  isHeaderTransparent?: boolean;
  footerActive?: boolean;
  headerButton?: ReactNode;
  footerOnClick?: () => void;
}

export const Layout: React.FC<ILayoutProps> = ({
  children,
  headerTitle,
  footerTitle,
  isHeaderTransparent = false,
  footerActive = true,
  headerButton,
  footerOnClick,
}) => (
  <div className="flex flex-col items-center w-full h-full bg-gray-400">
    {/* Header */}
    <Header title={headerTitle} isTransparency={isHeaderTransparent} buttonElement={headerButton} />

    {/* Main content */}
    <main>{children}</main>

    {/* Footer */}
    <Footer title={footerTitle} onClick={footerOnClick} active={footerActive} />
  </div>
);
