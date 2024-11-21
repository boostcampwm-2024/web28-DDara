import { Linedrawer } from '@/component/linedrawer/Linedrawer';
import { useContext, useEffect } from 'react';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';

export const DrawRoute = () => {
  const { setFooterTitle } = useContext(FooterContext);

  useEffect(() => {
    setFooterTitle('사용자 경로 추가 완료');
  }, []);

  return (
    <div className="flex h-full w-full flex-col py-20">
      <Linedrawer />
    </div>
  );
};
