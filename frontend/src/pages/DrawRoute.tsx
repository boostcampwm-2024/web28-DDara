import { useContext, useEffect } from 'react';
import { FooterContext } from '@/layout/footer/LayoutFooterProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, UserContext } from '@/context/UserContext';
import { ToolTypeProvider } from '@/context/ToolTypeContext';
import { buttonActiveType } from '@/layout/enumTypes';
import { MapProviderForDraw } from '@/component/canvasWithMap/canvasWithMapforDraw/MapProviderForDraw.tsx';
import { CurrentUserContext } from '@/context/CurrentUserContext';
import { getAddressFromCoordinates } from '@/utils/map/getAddress';

export const DrawRoute = () => {
  const { users, setUsers } = useContext(UserContext);
  const { setFooterTitle, setFooterActive, setFooterOnClick, resetFooterContext } =
    useContext(FooterContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const params = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();

  const goToRoutePage = () => {
    navigate(-1);
    resetFooterContext();
  };

  const getUser = () => {
    return users.find(user => user.name === params.user);
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
        1: '#B4D033',
        2: '#22A751',
        3: '#2722A7',
        4: '#8F22A7',
        5: '#A73D22',
      };

      // user.id에 맞는 marker 스타일 적용
      const updatedUser = {
        ...user,
        marker_style: {
          ...user.marker_style,
          color: markerColors[user.index] || 'marker:user1', // 기본값은 user1 색상
        },
      };

      setCurrentUser(updatedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setFooterOnClick(() => {
        if (currentUser) {
          const updateUserLocation = async () => {
            const updatedUser = { ...currentUser }; // currentUser 복사

            // start_location.title이 비어 있으면 주소를 업데이트
            if (!updatedUser.start_location.title) {
              try {
                const startAddress = await getAddressFromCoordinates(
                  updatedUser.start_location.lat,
                  updatedUser.start_location.lng,
                );
                updatedUser.start_location.title = startAddress; // 주소 업데이트
              } catch (error) {
                console.error('Error fetching start location address:', error);
              }
            }

            // end_location.title이 비어 있으면 주소를 업데이트
            if (!updatedUser.end_location.title) {
              try {
                const endAddress = await getAddressFromCoordinates(
                  updatedUser.end_location.lat,
                  updatedUser.end_location.lng,
                );
                updatedUser.end_location.title = endAddress; // 주소 업데이트
              } catch (error) {
                console.error('Error fetching end location address:', error);
              }
            }

            // user 정보를 업데이트
            const updatedUsers = users.map(user => {
              if (user.name === updatedUser.name) {
                return updatedUser; // 주소가 업데이트된 currentUser로 업데이트
              }
              return user;
            });

            setUsers(updatedUsers); // users 배열 업데이트
            goToRoutePage(); // 경로 추가 페이지로 이동
          };

          updateUserLocation(); // 위치 업데이트 함수 호출
        }
      });
    }
  }, [currentUser, users]);

  return (
    <ToolTypeProvider>
      <div className="flex h-full w-full flex-col py-[75px]">
        <div style={{ position: 'relative', padding: '1rem' }}>
          <MapProviderForDraw width={window.innerWidth - 32} height={window.innerHeight - 180} />
        </div>
      </div>
    </ToolTypeProvider>
  );
};
