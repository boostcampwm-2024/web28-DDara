import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { IoClose } from 'react-icons/io5';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { Outlet, useNavigate } from 'react-router-dom';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { HeaderContext } from '@/component/layout/header/LayoutHeaderProvider';
import { InputBox } from '../component/common/InputBox';

interface IUser {
  id: number;
  name: string;
  mockData?: number;
}

/**
 * Divider 컴포넌트: 구분선 역할을 하는 컴포넌트입니다.
 * @return {JSX.Element} 수평선 `<hr />` 요소를 반환합니다.
 */
const Divider = () => <hr className="my-6 w-full border-gray-300" />;

/**
 * AddChannel 컴포넌트
 *
 * 사용자가 경로 이름을 입력하고 최대 5명까지 사용자 추가가 가능합니다.
 * 각 사용자는 출발지와 도착지의 설정이 가능합니다.
 *
 * @return {JSX.Element} 채널 추가 페이지 레이아웃을 반환합니다.
 *
 * @remarks
 * 이 컴포넌트는 사용자가 지정된 이름으로 사용자를 추가하고,
 * 추가된 사용자마다 출발지, 도착지, 그리고 경로 설정이 가능합니다.
 *
 * @example
 * ```tsx
 * <AddChannel />
 * ```
 */

export const AddChannel = () => {
  const [users, setUsers] = useState<IUser[]>([{ id: 1, name: '사용자1', mockData: 10 }]);
  const { setFooterTitle, setFooterTransparency } = useContext(FooterContext);
  const { setLeftButton } = useContext(HeaderContext);
  const navigate = useNavigate();

  /**
   * 사용자 추가 함수
   *
   * 현재 사용자 목록에 새로운 사용자를 추가합니다.
   * 최대 5명까지 추가할 수 있으며, 그 이상은 추가할 수 없습니다.
   *
   * @return {void} 반환값이 없습니다.
   *
   * @remarks
   * 사용자가 5명 이상일 경우 추가되지 않도록 제한하고,
   * 추가되는 사용자는 '사용자[n]' 형식의 이름을 가집니다.
   *
   * @example
   * ```
   * addUser(); // 사용자 추가
   * ```
   */
  const addUser = () => {
    if (users.length === 5) return;
    const newUser: IUser = {
      id: users.length + 1,
      name: `사용자${users.length + 1}`,
      mockData: Math.floor(Math.random() * 100),
    };
    setUsers([...users, newUser]);
  };

  /**
   * 사용자 추가 함수
   *
   * 현재 사용자 목록에 사용자를 삭제합니다.
   * 최대 4명까지 삭제할 수 있으며, 첫 사용자는 삭제할 수 없습니다.
   *
   * @return {void} 반환값이 없습니다.
   *
   * @remarks
   * 사용자 2번 부터 삭제 버튼이 생깁니다.
   * 사용자가 삭제되면 id를 다시 부여하여 빈 부분을 당겨와 채웁니다.
   *
   * @example
   * ```
   * deleteUser(3); // 3번 id 사용자 삭제
   * ```
   */

  const deleteUser = (id: number) => {
    const updatedUsers = users
      .filter(user => user.id !== id)
      .map((user, index) => ({
        ...user,
        id: index + 1,
        name: `사용자${index + 1}`,
      }));
    setUsers(updatedUsers);
  };

  const goToUserDrawRoute = (name: string) => {
    navigate(`/add-channel/${name}/draw`);
  };

  useEffect(() => {
    setLeftButton('back');
    setFooterTitle('제작 완료');
    setFooterTransparency(false);
  }, []);

  return (
    <main className="flex h-full w-full flex-col items-center px-8 py-16">
      <Outlet />
      <InputBox placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길" />
      <Divider />
      <section className="w-full space-y-4">
        {users.map(user => (
          <div className="flex flex-row items-center justify-center space-x-2" key={user.id}>
            <div className="shadow-userName border-grayscale-400 flex h-12 w-16 items-center justify-center rounded-lg border text-xs">
              {user.name}
            </div>
            <button onClick={() => goToUserDrawRoute(user.name)}>
              <div
                className={classNames(
                  'text-grayscale-150 bg-grayscale-100 m-0 flex h-11 items-center justify-center rounded-md text-xs font-semibold',
                  user.id > 1 ? 'w-56' : 'w-64',
                )}
              >
                클릭시 출발지/도착지, 경로 설정 가능
              </div>
            </button>
            {user.id > 1 && (
              <button onClick={() => deleteUser(user.id)}>
                <IoClose className="text-grayscale-400 h-6 w-6" />
              </button>
            )}
          </div>
        ))}
      </section>
      <section className="text-grayscale-400 my-4 flex flex-row items-center justify-center gap-[2px] text-xs">
        <HiMiniInformationCircle className="h-4 w-4 text-black" />
        사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다.
      </section>
      {users.length < 5 && (
        <section className="flex w-full justify-end">
          <button
            onClick={addUser}
            className="bg-grayscale-25 border-gray-75 h-8 w-64 rounded border p-2 text-xs"
          >
            사용자 추가
          </button>
        </section>
      )}
    </main>
  );
};
