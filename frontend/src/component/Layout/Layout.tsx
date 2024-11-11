import React, { ReactElement } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface ILayoutProps {
  children: ReactElement;
  headerTitle?: string;
  footerTitle?: string;
  isHeaderTransparent?: boolean;
  footerActive?: boolean;
  headerButton?: ReactElement;
  footerOnClick?: () => void;
}

export const Layout = (props: ILayoutProps) => (
  <div className="flex flex-col items-center w-full h-full bg-gray-400">
    {/* Header */}
    <Header
      title={props.headerTitle}
      isTransparency={props.isHeaderTransparent}
      buttonElement={props.headerButton}
    />

    {/* Main content */}
    <main>{props.children}</main>

    {/* Footer */}
    <Footer title={props.footerTitle} onClick={props.footerOnClick} active={props.footerActive} />
  </div>
);
