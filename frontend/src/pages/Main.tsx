import { Fragment, useContext, useEffect, useState } from 'react';
import { getUserLocation } from '@/hooks/getUserLocation';
import { BottomSheet } from '@/component/bottomsheet/BottomSheet';
import { Content } from '@/component/content/Content';
import { MdFormatListBulleted } from 'react-icons/md';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { useNavigate } from 'react-router-dom';
import { NaverMap } from '@/component/maps/NaverMapSample.tsx';
import { buttonActiveType } from '@/component/layout/enumTypes';
import { loadLocalData, saveLocalData, removeLocalData } from '@/utils/common/manageLocalData.ts';
import { AppConfig } from '@/constants.ts';
import { v4 as uuidv4 } from 'uuid';
import { AuthModal } from '@/component/authmodal/AuthModal';
import { getUserChannels } from '@/api/channel.api.ts';

export const Main = () => {
  const { setFooterTitle, setFooterTransparency, setFooterOnClick, setFooterActive } =
    useContext(FooterContext);
  const { lat, lng, error } = getUserLocation();
  const navigate = useNavigate();
  const [otherLocations, setOtherLocations] = useState<any[]>([]);
  const MIN_HEIGHT = 0.35;
  const MAX_HEIGHT = 0.9;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    const token = loadLocalData(AppConfig.KEYS.LOGIN_TOKEN);
    setIsLoggedIn(!!token);

    if (token) {
      const userId = loadLocalData(AppConfig.KEYS.LOGIN_USER);
      if (userId) {
        getUserChannels(userId)
          .then(response => {
            if (response?.data?.channels) setChannels(response.data.channels);
          })
          .catch(err => {
            console.error('채널 찾기 실패 : ', err);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (lat && lng) {
      if (!loadLocalData(AppConfig.KEYS.BROWSER_TOKEN)) {
        const token = uuidv4();
        saveLocalData(AppConfig.KEYS.BROWSER_TOKEN, token);
      }
      const token = loadLocalData(AppConfig.KEYS.BROWSER_TOKEN);
      const ws = new WebSocket(`${AppConfig.SOCKET_SERVER}/?token=${token}`);

      // 초기 위치 전송
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'location', location: { lat, lng } }));
      };

      ws.onmessage = event => {
        const data = JSON.parse(event.data);

        if (data.type === 'init') {
          // 기존 클라이언트들의 위치 초기화
          setOtherLocations(data.clients);
        } else if (data.type === 'location' && data.token !== token) {
          // 새로 들어온 위치 업데이트
          setOtherLocations(prev =>
            prev.some(loc => loc.token === data.token)
              ? prev.map(loc => (loc.token === data.token ? data : loc))
              : [...prev, data],
          );
        }
      };
      return () => ws.close();
    }
    return undefined;
  }, [lat, lng]);

  const goToAddChannel = () => {
    navigate('/add-channel');
  };
  useEffect(() => {
    setFooterOnClick(goToAddChannel);
    setFooterTitle('+');
    setFooterTransparency(false);
    setFooterActive(buttonActiveType.ACTIVE);
  }, []);

  const handleLoginRequest = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeLocalData(AppConfig.KEYS.LOGIN_TOKEN);
    removeLocalData(AppConfig.KEYS.LOGIN_USER);
    setIsLoggedIn(!isLoggedIn);
  };

  const isUserLoggedIn = loadLocalData(AppConfig.KEYS.LOGIN_TOKEN) !== null;

  return (
    <div className="flex h-screen flex-col">
      <header className="absolute left-0 right-0 top-0 z-10 flex p-4">
        <button type="button" className="text-gray-700">
          <MdFormatListBulleted size={24} />
        </button>
        {isUserLoggedIn && (
          <button type="button" className="ml-auto text-gray-700" onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </header>

      <main
        className="relative flex-grow"
        style={{
          height: `calc(100% - ${MIN_HEIGHT * 100}%)`,
        }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {lat && lng ? (
          otherLocations ? (
            <NaverMap otherLocations={otherLocations} lat={lat} lng={lng} />
          ) : (
            <section className="flex h-full items-center justify-center">
              Loading map data...
            </section>
          )
        ) : (
          <section className="flex h-full items-center justify-center">
            {error ? `Error: ${error}` : 'Loading'}
          </section>
        )}
      </main>

      <BottomSheet minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT}>
        {isUserLoggedIn ? (
          channels.map(item => (
            <Fragment key={item.id}>
              <Content title={item.name} time={item.time} person={item.person} link={item.link} />
              <hr className="my-2" />
            </Fragment>
          ))
        ) : (
          <div
            className="flex h-full cursor-pointer items-center justify-center text-center text-gray-500"
            onClick={handleLoginRequest}
          >
            로그인을 진행하여
            <br />
            더 많은 기능을
            <br />
            사용해보세요
          </div>
        )}
      </BottomSheet>

      {/* 로그인 모달 */}
      <AuthModal isOpen={showLoginModal} onClose={handleCloseLoginModal} type="login" />
    </div>
  );
};
