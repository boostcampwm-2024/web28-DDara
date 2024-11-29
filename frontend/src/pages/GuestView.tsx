import { useEffect, useState, useRef } from 'react';
import { IGuest } from '@/types/channel.types.ts';
import { getGuestInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { IPoint } from '@/lib/types/canvasInterface.ts';
import { guestEntity } from '@/api/dto/channel.dto.ts';
import { GusetMarker } from '@/component/IconGuide/GuestMarker.tsx';
import { LoadingSpinner } from '@/component/common/loadingSpinner/LoadingSpinner.tsx';
import { getUserLocation } from '@/hooks/getUserLocation.ts';
import { loadLocalData, saveLocalData } from '@/utils/common/manageLocalData.ts';
import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { v4 as uuidv4 } from 'uuid';

export const GuestView = () => {
  const { lat, lng, alpha, error } = getUserLocation();
  const location = useLocation();

  const [guestInfo, setGuestInfo] = useState<IGuest>({
    id: '',
    name: '',
    markerStyle: { color: '' },
    startPoint: { lat: 0, lng: 0 },
    endPoint: { lat: 0, lng: 0 },
    paths: [],
  });

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 소켓 연결 초기화
    const token = loadLocalData(AppConfig.KEYS.BROWSER_TOKEN) || uuidv4();
    saveLocalData(AppConfig.KEYS.BROWSER_TOKEN, token);

    const ws = new WebSocket(
      `${AppConfig.SOCKET_SERVER}/?token=${token}&channelId=${location.pathname.split('/')[2]}&role=guest&guestId=${location.pathname.split('/')[4]}`,
    );

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    wsRef.current = ws;
  }, [location]);

  useEffect(() => {
    // 위치 정보가 변경될 때마다 전송
    if (lat && lng && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'location',
          location: { lat, lng, alpha },
        }),
      );
    }
  }, [lat, lng, alpha]);

  const transformTypeGuestEntityToIGuest = (props: guestEntity | undefined): IGuest => {
    return {
      id: props?.id ?? '',
      name: props?.name ?? '',
      // name: '현재 내 위치',
      startPoint: {
        lat: props?.start_location?.lat ?? 0,
        lng: props?.start_location?.lng ?? 0,
      },
      endPoint: {
        lat: props?.end_location?.lat ?? 0,
        lng: props?.end_location?.lng ?? 0,
      },
      paths: (props?.path as IPoint[]) ?? [],
      markerStyle: {
        color: props?.marker_style?.color ?? '',
      },
    };
  };

  const fetchGuestInfo = (channelId: string, userId: string) => {
    getGuestInfo(channelId, userId)
      .then(res => {
        if (!res.data) throw new Error('🚀 Fetch Error: responsed undefined');
        const transfromedData = transformTypeGuestEntityToIGuest(res.data.guest);
        setGuestInfo(transfromedData);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchGuestInfo(location.pathname.split('/')[2], location.pathname.split('/')[4]);
  }, []);

  return (
    <article className="absolute h-full w-screen flex-grow overflow-hidden">
      <GusetMarker markerColor={guestInfo.markerStyle.color} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {lat && lng ? (
        guestInfo ? (
          <MapCanvasForView
            lat={lat}
            lng={lng}
            alpha={alpha}
            width="100%"
            height="100%"
            guests={[guestInfo]}
          />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <section className="flex h-full flex-col items-center justify-center gap-2 text-xl text-gray-700">
          <LoadingSpinner />
          {error ? `Error: ${error}` : 'Loading map data...'}
        </section>
      )}
    </article>
  );
};
