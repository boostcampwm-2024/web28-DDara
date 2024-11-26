import { Linedrawer } from '@/component/linedrawer/Linedrawer';
import { useContext, useEffect } from 'react';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { useParams } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

export const DrawRoute = () => {
  const { users, setUsers } = useContext(UserContext);
  const { setFooterTitle } = useContext(FooterContext);
  const params = useParams<Record<string, string | undefined>>(); // userName을 URL 파라미터로 가져옴

  // URL에서 'user' 파라미터를 받아 해당 사용자를 찾음
  const getUser = (name: string | undefined) => {
    return users.find(user => user.name === name);
  };

  const user = getUser(params.user); // params.user에 해당하는 사용자 찾기

  const addMockData = () => {
    if (user) {
      const updatedUser = {
        ...user,
        start_location: { lat: 37.5665, lng: 126.978 }, // 임시 mock 데이터
        end_location: { lat: 35.1796, lng: 129.0756 },
        path: [
          { lat: 37.5665, lng: 126.978 },
          { lat: 36.5, lng: 127.5 },
          { lat: 35.1796, lng: 129.0756 },
        ],
        marker_style: { color: 'blue' },
      };

      // 해당 user의 state를 업데이트
      const updatedUsers = users.map(u => (u.name === params.user ? updatedUser : u)); // params.user를 사용해서 업데이트
      setUsers(updatedUsers);
    }
  };
  const resetMockData = () => {
    if (user) {
      const updatedUser = {
        ...user,
        start_location: { lat: 0, lng: 0 }, // 초기값으로 리셋
        end_location: { lat: 0, lng: 0 },
        path: [],
        marker_style: { color: '' },
      };

      // 해당 user의 state를 초기 상태로 업데이트
      const updatedUsers = users.map(u => (u.name === params.user ? updatedUser : u));
      setUsers(updatedUsers);
    }
  };

  useEffect(() => {
    setFooterTitle('사용자 경로 추가 완료');
  }, [setFooterTitle]);

  return (
    <div className="flex h-full w-full flex-col py-20">
      <button className="mb-4 border-2 p-2" onClick={addMockData}>
        Mock 데이터 추가
      </button>
      <button className="mb-4 border-2 p-2" onClick={resetMockData}>
        Mock 데이터 초기화
      </button>

      <Linedrawer />
    </div>
  );
};
