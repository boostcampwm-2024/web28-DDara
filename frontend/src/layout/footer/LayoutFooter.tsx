import { useContext } from 'react';
import { FooterContext } from '@/layout/footer/LayoutFooterProvider.tsx';
import { Footer } from '@/layout/footer/Footer.tsx';

export const LayoutFooter = () => {
  const { footerOption } = useContext(FooterContext);

  return (
    <Footer
      title={footerOption.title}
      onClick={footerOption.onClick}
      active={footerOption.active}
      isTranperency={footerOption.isTranperency}
    />
  );
};
