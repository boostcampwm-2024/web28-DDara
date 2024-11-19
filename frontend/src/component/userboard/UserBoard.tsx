import classNames from 'classnames';
import { HiLocationMarker } from 'react-icons/hi';

const users = [
  {
    name: '사용자1',
    markerColor: 'text-marker-user1',
  },
  {
    name: '사용자2',
    markerColor: 'text-marker-user2',
  },
  {
    name: '사용자3',
    markerColor: 'text-marker-user3',
  },
  {
    name: '사용자4',
    markerColor: 'text-marker-user4',
  },
  {
    name: '사용자5',
    markerColor: 'text-marker-user5',
  },
];
// mock데이터 작성, 추후 context 를 이용해 dropdown과 연동

/**
 * UserBoard 컴포넌트는 지도 위 오버레이가 되며, 현재 경로의 사용자 및 선택된 사용자를 색상과 함께 표시합니다.
 * @remarks
 * 파라미터 혹은 전역 상태로 받은 유저를 역순으로 아래부터 보여줍니다.
 * @example
 * return (
 *   <UserBoard />
 * )
 */

export const UserBoard = () => {
  return (
    <div className="absolute bottom-2.5 right-7 z-[4050] flex flex-col gap-1.5">
      {users
        .slice()
        .reverse()
        .map(user => (
          <div className="flex flex-row items-center justify-center gap-1">
            <HiLocationMarker className={classNames(user.markerColor, 'w-5', 'h-5')} />
            <div className="text-2xs">{user.name}</div>
          </div>
        ))}
    </div>
  );
};
