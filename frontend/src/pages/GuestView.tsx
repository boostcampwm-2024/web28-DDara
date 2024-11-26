import { ReactNode, useEffect, useState } from 'react';
import { IGuest } from '@/types/channel.types.ts';
import { getGuestInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { IPoint } from '@/lib/types/canvasInterface.ts';
import { guestEntity } from '@/api/dto/channel.dto.ts';
import { UserMarker } from '@/component/userMarker/UserMarker.tsx';

export const GuestView = () => {
  const [guestInfo, setGuestInfo] = useState<IGuest>({
    id: '',
    name: '',
    markerStyle: { color: '' },
    startPoint: { lat: 0, lng: 0 },
    endPoint: { lat: 0, lng: 0 },
    paths: [],
  });
  const [component, setComponent] = useState<ReactNode>();

  const location = useLocation();

  const transformTypeGuestEntityToIGuest = (props: guestEntity): IGuest => {
    return {
      id: props.id ?? '',
      // name: props.name ?? '',
      name: '현재 내 위치',
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

  const fetchGuestInfo = (channelId: string, userId: string) => {
    getGuestInfo(channelId, userId)
      .then(res => {
        if (!res.data) throw new Error('🚀 Fetch Error: responsed undefined');
        const transfromedData = transformTypeGuestEntityToIGuest(res.data);
        setGuestInfo(transfromedData);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchGuestInfo(location.pathname.split('/')[2], location.pathname.split('/')[4]);
  }, []);

  useEffect(() => {
    console.log(guestInfo);
    if (guestInfo) {
      setComponent(
        <MapCanvasForView
          lat={37.3595704}
          lng={127.105399}
          width="100%"
          height="100%"
          guests={[guestInfo]}
        />,
      );
    }
  }, [guestInfo]);

  return (
    <article className="absolute h-full w-screen flex-grow overflow-hidden">
      <UserMarker userData={[guestInfo]} />
      {component}
    </article>
  );
};
