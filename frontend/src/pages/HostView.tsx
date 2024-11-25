import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';
import { useContext, useEffect, useState } from 'react';
import { CanvasWithMap } from '@/component/canvas/CanvasWithMap.tsx';
import { IUserChannelInfo } from '@/types/channel.types.ts';
import { getChannelInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';

export const HostView = () => {
  const [userChannels, setUserChannels] = useState<IUserChannelInfo>();
  const [userNames, setUserNames] = useState<string[]>(['사용자 1']);

  const headerContext = useContext(HeaderContext);

  const location = useLocation();

  const fetchChannelInfo = (id: string) => {
    getChannelInfo(id)
      .then(res => {
        if (res.data) setUserChannels(res.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    headerContext.setRightButton('dropdown');
    headerContext.setLeftButton('back');
    headerContext.setItems(['1']);

    fetchChannelInfo(location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    if (userChannels?.guests) {
      const names = userChannels.guests.filter(Boolean).map(guest => guest.name!);
      setUserNames(names);
    }
  }, [userChannels]);

  useEffect(() => {
    headerContext.setItems(userNames);
  }, [userNames]);

  // TODO: geoCoding API를 이용해서 현재 위치나 시작위치를 기반으로 자동 좌표 설정 구현 (현재: 하드코딩)
  return <CanvasWithMap lat={37.3595704} lng={127.105399} zoom={21} mapType="naver" allowCanvas />;
};
