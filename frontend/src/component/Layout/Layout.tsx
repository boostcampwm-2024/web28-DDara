import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { Header } from './Header';
import { Footer } from './Footer';

interface ILayoutProps {
  children: ReactElement;
  headerTitle?: string;
  footerTitle?: string;
  isHeaderTransparent?: boolean;
  footerActive?: boolean;
  headerButton?: ReactElement;
  handleFooterClick?: () => void;
}

export const Layout = (props: ILayoutProps) => (
  <div
    className={classNames('flex', 'flex-col', 'items-center', 'w-full', 'h-full', 'bg-gray-400')}
  >
    {/* Header */}
    <Header
      title={props.headerTitle}
      isTransparency={props.isHeaderTransparent}
      buttonElement={props.headerButton}
    />

    {/* Main content */}
    <main>{props.children}</main>

    {/* Footer */}
    <Footer
      title={props.footerTitle}
      onClick={props.handleFooterClick}
      active={props.footerActive}
    />
  </div>
);
