import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';
import { useContext, useEffect, useState } from 'react';
import { IGuest, IUserChannelInfo } from '@/types/channel.types.ts';
import { getChannelInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { IGuestDataInMapProps, IPoint } from '@/lib/types/canvasInterface.ts';

export const HostView = () => {
  const [userChannels, setUserChannels] = useState<IUserChannelInfo>();
  const [userNames, setUserNames] = useState<string[]>(['사용자 1']);
  const [guestList, setGuestList] = useState<IGuest[]>([]);
  const [mapProps, setMapProps] = useState<IGuestDataInMapProps[]>([]);

  const [component, setComponent] = useState<any>();

  const headerContext = useContext(HeaderContext);

  const location = useLocation();

  const fetchChannelInfo = (id: string) => {
    getChannelInfo(id)
      .then(res => {
        if (res.data) setUserChannels(res.data as IUserChannelInfo);
        setGuestList(res.data?.guests as IGuest[]);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const transformType = (props: IGuest) => {
    return {
      name: props.name ?? '',
      startPoint: {
        lat: props.start_location?.lat ?? 0,
        lng: props.start_location?.lng ?? 0,
      },
      endPoint: {
        lat: props.end_location?.lat ?? 0,
        lng: props.end_location?.lng ?? 0,
      },
      paths: (props.path as IPoint[]) ?? [],
      markerStyle: {
        color: props.marker_style?.color ?? '',
      },
    };
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
      guestList.map(el => setMapProps(prev => [...prev, transformType(el)]));
      // guestList.map(el => mapProps.push(transformType(el)));
      // console.log(mapProps);
    }
  }, [userChannels]);

  useEffect(() => {
    if (mapProps.length > 1) {
      setComponent(
        <MapCanvasForView
          lat={37.3595704}
          lng={127.105399}
          width="100%"
          height="100%"
          guests={mapProps}
        />,
      );
    }
    // console.log(mapProps);
  }, [mapProps]);

  useEffect(() => {
    headerContext.setItems(userNames);
  }, [userNames]);

  // TODO: geoCoding API를 이용해서 현재 위치나 시작위치를 기반으로 자동 좌표 설정 구현 (현재: 하드코딩)
  // return <CanvasWithMap lat={37.3595704} lng={127.105399} zoom={21} mapType="naver" allowCanvas />;
  return <div className="absolute h-full w-screen flex-grow overflow-hidden">{component}</div>;
};
