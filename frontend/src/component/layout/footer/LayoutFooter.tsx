import { useContext } from 'react';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { Footer } from '@/component/layout/footer/Footer';

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
