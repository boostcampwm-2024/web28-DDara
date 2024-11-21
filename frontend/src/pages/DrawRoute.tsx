import { Linedrawer } from '@/component/linedrawer/Linedrawer';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';
import { useParams } from 'react-router-dom';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';

export const DrawRoute = () => {
  const { setLeftButton, setTitle, setSubTitle } = useContext(HeaderContext);
  const { setFooterTitle } = useContext(FooterContext);
  const params = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    setLeftButton('back');
    setTitle(`${params.user}에 대한 경로 설정`);
    setSubTitle(`사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다`);
    setFooterTitle('사용자 경로 추가 완료');
  }, []);

  return (
    <div className="flex h-full w-full flex-col py-20">
      <Linedrawer />
    </div>
  );
};
