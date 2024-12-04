import { Fragment, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { MdLogout } from 'react-icons/md';
import { FooterContext } from '@/layout/footer/LayoutFooterProvider';
import { useNavigate } from 'react-router-dom';
import { buttonActiveType } from '@/layout/enumTypes';
import { loadLocalData, saveLocalData, removeLocalData } from '@/utils/common/manageLocalData.ts';
import { AuthModal } from '@/component/authmodal/AuthModal';
import { deleteChannel, getUserChannels } from '@/api/channel.api.ts';
import { BottomSheet } from '@/component/bottomsheet/BottomSheet.tsx';
import { Content } from '@/component/content/Content.tsx';
import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { v4 as uuidv4 } from 'uuid';
import { getUserLocation } from '@/hooks/getUserLocation.ts';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { LoadingSpinner } from '@/component/common/loadingSpinner/LoadingSpinner.tsx';
import { UserContext } from '@/context/UserContext';
import { ToggleProvider } from '@/context/DropdownContext.tsx';
import { Confirm } from '@/component/confirm/Confirm.tsx';

export const Main = () => {
  const {
    setFooterTitle,
    setFooterTransparency,
    setFooterOnClick,
    setFooterActive,
    resetFooterContext,
  } = useContext(FooterContext);
  const { lat, lng, alpha, error } = getUserLocation();
  const [otherLocations, setOtherLocations] = useState<any[]>([]);
  const MIN_HEIGHT = 0.15;
  const MAX_HEIGHT = 0.9;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [channels, setChannels] = useState<any[]>([]);
  const [modalState, setModalState] = useState<'none' | 'confirm' | 'alert'>('none');
  const [modal, setModal] = useState<ReactNode>(false);

  const deleteTargetRef = useRef<string>('');

  const { resetUsers } = useContext(UserContext);

  const handleDeleteChannel = (channelId: string) => {
    setModalState('confirm');
    deleteTargetRef.current = channelId;
    // setIsDeleted(prev => !prev);
  };

  const handleDeleteModalCancel = () => {
    setModalState('none');
  };

  const handleDeleteModalConfirm = async () => {
    try {
      await deleteChannel(deleteTargetRef.current);
      setModalState('alert');
      console.log(modalState);
    } catch (err) {
      console.error('Failed to delete channel info:', err);
    }
  };

  useEffect(() => {
    if (modalState === 'confirm') {
      setModal(
        <Confirm
          type="confirm"
          message="채널을 삭제 하시겠습니까?"
          onConfirm={handleDeleteModalConfirm}
          onCancel={handleDeleteModalCancel}
        />,
      );
      return;
    }
    if (modalState === 'alert') {
      setModal(
        <Confirm
          message="삭제 되었습니다."
          onConfirm={() => {
            setModalState('none');
          }}
          onCancel={() => {}}
          type="alert"
        />,
      );
      return;
    }

    const token = loadLocalData(AppConfig.KEYS.LOGIN_TOKEN);
    setIsLoggedIn(!!token);

    if (token) {
      const userId = loadLocalData(AppConfig.KEYS.LOGIN_USER);
      if (userId) {
        getUserChannels(userId)
          .then(response => {
            if (response?.data?.channels) {
              setChannels(response.data.channels);
            }
          })
          .catch(err => {
            console.error('채널 찾기 실패 : ', err);
          });
      }
    }
  }, [modalState]);

  const navigate = useNavigate();

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
        ws.send(JSON.stringify({ type: 'location', location: { lat, lng, alpha } }));
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
        } else if (data.type === 'channel') {
          setChannels(prevChannels => {
            if (prevChannels.some(channel => channel.id === data.channel.id)) {
              return prevChannels;
            }
            return [...prevChannels, data.channel];
          });
        }
      };

      return () => ws.close();
    }
    return undefined;
  }, [lat, lng, alpha]);

  const goToAddChannel = () => {
    resetFooterContext();
    resetUsers();
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
    <ToggleProvider>
      <div className="flex flex-col overflow-hidden">
        <header className="absolute left-0 right-0 top-0 z-10 flex p-4">
          {isUserLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex flex-col items-center gap-2 text-gray-700"
            >
              <MdLogout size={24} className="text-blueGray-800" />
              <span className="text-xs">로그아웃</span>
            </button>
          )}
        </header>

        <main className="absolute h-full w-screen flex-grow overflow-hidden">
          {/* eslint-disable-next-line no-nested-ternary */}
          {lat && lng ? (
            otherLocations ? (
              <MapCanvasForView
                width="100%"
                height="100%"
                lat={lat}
                lng={lng}
                alpha={alpha}
                otherLocations={otherLocations}
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
        </main>

        {isUserLoggedIn ? (
          <BottomSheet minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT} backgroundColor="#FFFFFF">
            {channels.map(item => (
              <Fragment key={item.id}>
                <Content
                  channelId={item.id}
                  title={item.name}
                  link={`/channel/${item.id}/host`}
                  person={item.guest_count}
                  time={item.generated_at}
                  onDelete={handleDeleteChannel}
                />
                <hr className="my-2" />
              </Fragment>
            ))}
            <div className="h-20" />
          </BottomSheet>
        ) : (
          <BottomSheet minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT} backgroundColor="#F1F1F1F2">
            <div className="h-full w-full cursor-pointer" onClick={handleLoginRequest}>
              <div className="absolute left-1/2 top-[20%] flex -translate-x-1/2 transform cursor-pointer flex-col p-6 text-center">
                <p className="text-grayscale-175 mb-5 text-lg font-normal">로그인을 진행하여</p>
                <p className="text-grayscale-175 mb-5 text-lg font-normal">더 많은 기능을</p>
                <p className="text-grayscale-175 text-lg font-normal">사용해보세요</p>
              </div>
            </div>
          </BottomSheet>
        )}

        {modalState !== 'none' && modal}

        {/* 로그인 모달 */}
        <AuthModal isOpen={showLoginModal} onClose={handleCloseLoginModal} type="login" />
      </div>
    </ToggleProvider>
  );
};
