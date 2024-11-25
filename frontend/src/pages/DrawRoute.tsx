import { Linedrawer } from '@/component/linedrawer/Linedrawer';
import { useContext, useEffect, useMemo } from 'react';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, UserContext } from '@/context/UserContext';
import { SearchBox } from '@/component/searchbox/SearchBox';
import { ToolTypeProvider } from '@/context/ToolTypeContext';
import { buttonActiveType } from '@/component/layout/enumTypes';

export const DrawRoute = () => {
  const { users, setUsers } = useContext(UserContext);
  const { setFooterTitle, setFooterActive, setFooterOnClick } = useContext(FooterContext);
  const params = useParams<Record<string, string | undefined>>(); // userName을 URL 파라미터로 가져옴
  const navigate = useNavigate();

  const goToAddChannelRoute = () => {
    navigate(`/add-channel/`);
  };

  const currentUser = useMemo(() => {
    return users.find(user => user.name === params.user);
  }, [users, params.user]);

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
      user.end_location.lng !== 0
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
    setFooterOnClick(goToAddChannelRoute);
    setFooterActive(buttonActiveType.PASSIVE);
  }, []);

  if (!currentUser) {
    // currentUser가 없을 경우에는 이 페이지에서 아무것도 렌더링하지 않거나, 에러 메시지를 표시할 수 있습니다.
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <ToolTypeProvider>
      <div className="flex h-full w-full flex-col py-20">
        <SearchBox user={currentUser} />
        <button className="mb-4 border-2 p-2" onClick={resetMockData}>
          Mock 데이터 초기화
        </button>

        <Linedrawer />
      </div>
    </ToolTypeProvider>
  );
};
