import { useState } from 'react';
import { InputBox } from '../component/common/InputBox';

interface IUser {
  id: number;
  name: string;
}

const Divider = () => <hr className="my-6 w-full border-gray-300" />;

export const AddChannel = () => {
  const [users, setUsers] = useState<IUser[]>([{ id: 1, name: '사용자1' }]);

  const addUser = () => {
    if (users.length === 5) return;
    const newUser: IUser = {
      id: users.length + 1,
      name: `사용자${users.length + 1}`,
    };
    setUsers([...users, newUser]);
  };

  return (
    <main className="flex h-full w-full flex-col items-center px-8">
      <InputBox placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길" />
      <Divider />
      <section className="w-full space-y-4">
        {users.map(user => (
          <div className="flex flex-row items-center justify-center space-x-2" key={user.id}>
            <div className="shadow-userName border-grayscale-200 flex h-12 w-16 items-center justify-center rounded-lg border text-xs">
              {user.name}
            </div>
            <div className="text-grayscale-150 m-0 flex h-11 w-64 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold">
              클릭시 출발지/도착지, 경로 설정 가능
            </div>
          </div>
        ))}
      </section>
      <section className="my-4 flex flex-row items-center justify-center gap-[2px] text-xs text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11px"
          height="11px"
          fill="black"
          className="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
        </svg>
        사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다.
      </section>
      <section className="flex w-full justify-end">
        <button
          onClick={addUser}
          className="bg-grayscale-25 border-gray-75 w-64 rounded border p-2 text-xs"
        >
          사용자 추가
        </button>
      </section>
    </main>
  );
};
