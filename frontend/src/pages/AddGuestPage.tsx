import { useContext, useEffect, useState } from 'react';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { RouteSettingButton } from '@/component/routebutton/RouteSettingButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { RouteResultButton } from '@/component/routebutton/RouteResultButton';
import { IUser, UserContext } from '@/context/UserContext';
import { buttonActiveType } from '@/component/layout/enumTypes';
import { addChannelReqEntity, guestEntity } from '@/api/dto/channel.dto';
import { addGuestChannel } from '@/api/channel.api';
import { Page } from '@/component/routebutton/enum';
import { ChannelContext } from '@/context/ChannelContext';
import { InputBox } from '../component/common/InputBox';

/**
 * Divider 컴포넌트: 구분선 역할을 하는 컴포넌트입니다.
 * @return {JSX.Element} 수평선 `<hr />` 요소를 반환합니다.
 */
const Divider = () => <hr className="my-6 w-full border-gray-300" />;

export const AddGuestPage = () => {
  const { channelInfo } = useContext(ChannelContext);
  const { users, setUsers, resetUsers } = useContext(UserContext);
  const [guests, setGuests] = useState<IUser[]>([]);
  const {
    setFooterTitle,
    setFooterTransparency,
    setFooterActive,
    setFooterOnClick,
    resetFooterContext,
    footerOption,
  } = useContext(FooterContext);

  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate('/');
    resetFooterContext();
    resetUsers();
  };

  // marker 색상과 인덱스를 매핑하는 객체
  const markerColors: { [key: number]: string } = {
    1: '#B4D033',
    2: '#22A751',
    3: '#2722A7',
    4: '#8F22A7',
    5: '#A73D22',
  };

  // guest 데이터를 IUser 배열로 변환하는 함수
  const convertGuestsToUsers = (channelGuests: guestEntity[]): IUser[] => {
    // markerColors의 순서에 따라 guests를 정렬
    const sortedGuests = [...channelGuests].sort((a, b) => {
      const colorA = a.marker_style?.color || '';
      const colorB = b.marker_style?.color || '';
      const indexA = Object.values(markerColors).indexOf(colorA);
      const indexB = Object.values(markerColors).indexOf(colorB);

      return indexA - indexB;
    });

    return sortedGuests.map((guest, index) => ({
      id: guest.id || `guest-${index}`,
      index: index + 1,
      name: guest.name || '',
      start_location: {
        title: guest.start_location?.title || '',
        lat: guest.start_location?.lat || 0,
        lng: guest.start_location?.lng || 0,
      },
      end_location: {
        title: guest.end_location?.title || '',
        lat: guest.end_location?.lat || 0,
        lng: guest.end_location?.lng || 0,
      },
      path:
        guest.path?.map(p => ({
          lat: p.lat || 0,
          lng: p.lng || 0,
        })) || [],
      marker_style: {
        color: guest.marker_style?.color || '',
      },
    }));
  };

  // 사용자를 추가하는 함수
  const addUser = () => {
    const newIndex = guests.length + users.length + 1;
    const newUser: IUser = {
      id: '',
      index: newIndex,
      name: `사용자${newIndex}`,
      start_location: { title: '', lat: 0, lng: 0 },
      end_location: { title: '', lat: 0, lng: 0 },
      path: [],
      marker_style: { color: '' },
    };
    setUsers(users ? [...users, newUser] : [newUser]);
  };

  // 사용자 데이터가 완전한지 확인하는 함수
  const isUserDataComplete = (user: IUser): boolean => {
    return (
      user.start_location.lat !== 0 &&
      user.start_location.lng !== 0 &&
      user.end_location.lat !== 0 &&
      user.end_location.lng !== 0 &&
      user.path.length > 0 &&
      user.marker_style.color !== ''
    );
  };

  // 사용자를 삭제하는 함수
  const deleteUser = (index: number) => {
    const updatedUsers = users
      .filter(user => user.index !== index)
      .map((user, i) => ({
        ...user,
        index: guests.length + i + 1,
        name: user.name || `사용자${guests.length + i + 1}`,
      }));
    setUsers(updatedUsers);
  };

  // 채널 생성 API 호출
  const addGuestChannelAPI = async () => {
    try {
      const channelData: addChannelReqEntity = {
        channel_id: channelInfo.id,
        guests: users.map(user => ({
          name: user.name,
          start_location: {
            title: user.start_location.title,
            lat: user.start_location.lat,
            lng: user.start_location.lng,
          },
          end_location: {
            title: user.end_location.title,
            lat: user.end_location.lat,
            lng: user.end_location.lng,
          },
          path: user.path.map(p => ({
            lat: p.lat,
            lng: p.lng,
          })),
          marker_style: user.marker_style,
        })),
      };
      const response = await addGuestChannel(channelData);
      if (response.resultCode === 0) {
        goToMainPage();
      }
    } catch (error) {
      console.error('게스트 추가 실패:', error);
    }
  };

  useEffect(() => {
    setFooterTitle('수정 완료');
    setFooterTransparency(false);
    setFooterActive(buttonActiveType.PASSIVE);
    if (channelInfo?.guests) {
      const initialGuests = convertGuestsToUsers(channelInfo.guests);
      setGuests(initialGuests);
    }
  }, []);

  // 모든 사용자가 데이터를 완료했는지 확인하여 Footer 활성화 여부 결정
  useEffect(() => {
    const allUsersComplete = users?.every(isUserDataComplete);
    if (allUsersComplete) {
      setFooterActive(buttonActiveType.ACTIVE);
    } else {
      setFooterActive(buttonActiveType.PASSIVE);
    }
  }, [users]);

  useEffect(() => {
    if (footerOption.active) {
      setFooterOnClick(() => addGuestChannelAPI());
    }
  }, [footerOption.active]);

  const setUserName = (index: number, newName: string) => {
    const updatedUsers = users.map(user =>
      user.index === index ? { ...user, name: newName } : user,
    );
    setUsers(updatedUsers);
  };

  return (
    <main className="flex h-full w-full flex-col items-center px-8 py-16">
      <Outlet />
      <InputBox
        placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길"
        value={channelInfo.name}
        readOnly
      />
      <Divider />
      <section className="w-full space-y-4">
        {guests.map(guest => (
          <div key={guest.index}>
            <RouteResultButton setUserName={setUserName} user={guest} page={Page.ADD} isGuest />
          </div>
        ))}
        {users &&
          users.map(user => (
            <div key={user.index}>
              {isUserDataComplete(user) ? (
                <RouteResultButton
                  setUserName={setUserName}
                  user={user}
                  deleteUser={deleteUser}
                  page={Page.ADD}
                />
              ) : (
                <RouteSettingButton setUserName={setUserName} user={user} deleteUser={deleteUser} />
              )}
            </div>
          ))}
      </section>
      <section className="text-grayscale-400 my-4 flex flex-row items-center justify-center gap-[2px] text-xs">
        <HiMiniInformationCircle className="h-4 w-4 text-black" />
        사용자 별로 출발지/도착지, 경로을 설정할 수 있습니다.
      </section>
      {guests.length + users.length < 5 && (
        <section className="flex w-full justify-end">
          <button
            type="button"
            onClick={addUser}
            className="bg-grayscale-25 border-gray-75 font-nomal mr-8 h-8 w-64 rounded border p-2 text-xs"
          >
            사용자 추가
          </button>
        </section>
      )}
    </main>
  );
};
