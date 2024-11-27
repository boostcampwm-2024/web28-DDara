import { HeaderDropdownContext } from '@/component/header/HeaderDropdownProvider.tsx';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { IGuest, IChannelInfo, IGuestData } from '@/types/channel.types.ts';
import { getChannelInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { IGuestDataInMapProps, IPoint } from '@/lib/types/canvasInterface.ts';
import { getChannelResEntity, guestEntity } from '@/api/dto/channel.dto.ts';
import { HostMarker } from '@/component/IconGuide/HostMarker.tsx';

export const HostView = () => {
  const [channelInfo, setChannelInfo] = useState<IChannelInfo>();
  const [guestsData, setGuestsData] = useState<IGuestData[]>([]);
  const [mapProps, setMapProps] = useState<IGuestDataInMapProps[]>([]);
  const [component, setComponent] = useState<ReactNode>();
  const [clickedId, setClickedId] = useState<string>('');

  const headerDropdownContext = useContext(HeaderDropdownContext);

  const location = useLocation();

  const transformTypeGuestEntityToIGuest = (props: guestEntity): IGuest => {
    return {
      id: props.id ?? '',
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

  const transformTypeFromResToInfo = (props: getChannelResEntity): IChannelInfo => {
    const guests = props.guests?.map(guest => transformTypeGuestEntityToIGuest(guest)) ?? [];

    return {
      name: props.name ?? '',
      hostId: props.host_id ?? '',
      channelId: props.id ?? '',
      guests,
    };
  };

  const fetchChannelInfo = (userId: string) => {
    getChannelInfo(userId)
      .then(res => {
        if (!res.data) throw new Error('🚀 Fetch Error: responsed undefined');
        const transfromedData = transformTypeFromResToInfo(res.data);
        setChannelInfo(transfromedData);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleClickDropdown = (guestId: string) => {
    setClickedId(guestId);
  };

  useEffect(() => {
    headerDropdownContext.setItems([{ name: '사용자 1', id: '1', markerStyle: { color: '#000' } }]);

    fetchChannelInfo(location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    const markerDefaultColor = ['#B4D033', '#22A751', '#2722A7', '#8F22A7', '#A73D22'];

    if (channelInfo?.guests) {
      const data: IGuestData[] = channelInfo.guests.map((guest, index) => ({
        name: guest.name,
        markerStyle: guest.markerStyle ?? { color: markerDefaultColor[index] },
        // markerStyle: { color: markerDefaultColor[index] },
        id: guest.id,
      }));

      setGuestsData(data);

      if (clickedId === '') {
        setMapProps([]);
        channelInfo.guests?.map(guest =>
          setMapProps(prev => [...prev, guest as IGuestDataInMapProps]),
        );
      } else {
        setMapProps(channelInfo.guests?.filter(guest => guest.id === clickedId));
      }
    }
  }, [channelInfo, clickedId]);

  useEffect(() => {
    headerDropdownContext.setItems(guestsData);
    headerDropdownContext.setOnClickHandler(handleClickDropdown);
  }, [guestsData]);

  useEffect(() => {
    setComponent(
      <MapCanvasForView
        lat={37.3595704}
        lng={127.105399}
        width="100%"
        height="100%"
        guests={mapProps}
      />,
    );
  }, [mapProps]);

  return (
    <article className="absolute h-full w-screen flex-grow overflow-hidden">
      <HostMarker guestsData={mapProps} />
      {component}
    </article>
  );
};
