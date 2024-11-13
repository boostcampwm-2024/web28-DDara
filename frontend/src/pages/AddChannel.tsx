import { useState } from 'react';
import { InputBox } from '../component/common/InputBox';

interface IUser {
  id: number;
  name: string;
}

const Divider = () => <hr className="my-5 w-[90%] border-gray-300" />;

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
  // main의 경우 임시로 w와 h 설정
  return (
    <main className="h-[852px] w-[393px] bg-white">
      <section className="flex h-[95%] w-full flex-col items-center">
        <InputBox
          className="placeholder:text-xs"
          placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길"
        />
        <Divider />
        <section className="w-[90%] space-y-2">
          {users.map(user => (
            <div className="flex flex-row space-x-5" key={user.id}>
              <div className="flex h-[45px] w-[60px] items-center justify-center border border-gray-300 text-sm">
                {user.name}
              </div>
              <div className="m-0 flex h-[45px] w-[80%] items-center justify-center rounded-sm bg-gray-100 text-xs text-gray-400">
                클릭시 출발지/도착지, 경로 설정 가능
              </div>
            </div>
          ))}
        </section>
        <section className="text-2xs my-4 flex flex-row items-center justify-center gap-[10px] text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
          </svg>
          사용자 별로 출발지/도착지(마커), 경로(그림)을 설정할 수 있습니다.
        </section>
        <section className="flex w-[90%] justify-end">
          <button onClick={addUser} className="w-[75%] rounded border border-gray-300 p-2 text-xs">
            사용자 추가
          </button>
        </section>
      </section>
    </main>
  );
};
