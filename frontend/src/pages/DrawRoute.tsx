import { useContext, useEffect } from 'react';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, UserContext } from '@/context/UserContext';
import { SearchBox } from '@/component/searchbox/SearchBox';
import { ToolTypeProvider } from '@/context/ToolTypeContext';
import { buttonActiveType } from '@/component/layout/enumTypes';
import { MapProviderForDraw } from '@/component/canvasWithMap/MapProviderForDraw';
import { CurrentUserContext } from '@/context/CurrentUserContext';

export const DrawRoute = () => {
  const { users, setUsers } = useContext(UserContext);
  const { setFooterTitle, setFooterActive, setFooterOnClick } = useContext(FooterContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const params = useParams<Record<string, string | undefined>>(); // userName을 URL 파라미터로 가져옴
  const navigate = useNavigate();

  const goToAddChannelRoute = () => {
    navigate(`/add-channel/`);
  };

  const getUser = () => {
    return users.find(user => user.name === params.user);
  };

  const resetMockData = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        start_location: { title: '', lat: 0, lng: 0 }, // 초기값으로 리셋
        end_location: { title: '', lat: 0, lng: 0 },
        path: [],
        marker_style: { color: '' },
      };

      // 해당 user의 state를 초기 상태로 업데이트
      const updatedUsers = users.map(u => (u.name === params.user ? updatedUser : u));
      setUsers(updatedUsers);
    }
  };

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

  useEffect(() => {
    if (currentUser) {
      const UsersComplete = isUserDataComplete(currentUser);

      // 모든 사용자가 완전한 데이터라면 Footer를 활성화
      if (UsersComplete) {
        setFooterActive(buttonActiveType.ACTIVE);
      } else {
        setFooterActive(buttonActiveType.PASSIVE);
      }
    }
  }, [users, currentUser, setFooterActive]); // currentUser가 변경될 때마다 실행

  useEffect(() => {
    setFooterTitle('사용자 경로 추가 완료');
    setFooterActive(buttonActiveType.PASSIVE);
    const user = getUser();
    if (user) {
      // userId에 따른 Tailwind 색상 클래스를 설정
      const markerColors: { [key: number]: string } = {
        1: 'marker:user1', // tailwind의 custom color class로 설정
        2: 'marker:user2',
        3: 'marker:user3',
        4: 'marker:user4',
        5: 'marker:user5',
      };

      // user.id에 맞는 marker 스타일 적용
      const updatedUser = {
        ...user,
        marker_style: {
          ...user.marker_style,
          color: markerColors[user.id] || 'marker:user1', // 기본값은 user1 색상
        },
      };

      setCurrentUser(updatedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      // currentUser가 설정된 후에 footerOnClick을 설정
      setFooterOnClick(() => {
        if (currentUser) {
          console.log('Footer 버튼 클릭 시 currentUser:', currentUser);

          // `users` 배열에서 `currentUser`를 찾아 업데이트
          const updatedUsers = users.map(user => {
            if (user.name === currentUser.name) {
              return { ...user, ...currentUser }; // currentUser 정보로 업데이트
            }
            return user;
          });

          setUsers(updatedUsers); // 업데이트된 users 배열 설정
          goToAddChannelRoute(); // 경로 추가 페이지로 이동
        }
      });
    }
  }, [currentUser, users]);

  if (!currentUser) {
    // currentUser가 없을 경우에는 이 페이지에서 아무것도 렌더링하지 않거나, 에러 메시지를 표시할 수 있습니다.
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <ToolTypeProvider>
      <div className="flex h-full w-full flex-col py-20">
        <SearchBox />
        <button className="mb-4 border-2 p-2" onClick={resetMockData}>
          Mock 데이터 초기화
        </button>

        <div style={{ position: 'relative', padding: '1rem' }}>
          {/* TODO: 동율님 mock 데이터 관련 버튼 없애고 나서, height={window.innerHeight - 180} 으로 변경해주시면 됩니다! */}
          <MapProviderForDraw width={window.innerWidth - 32} height={window.innerHeight - 300} />
        </div>
      </div>
    </ToolTypeProvider>
  );
};
