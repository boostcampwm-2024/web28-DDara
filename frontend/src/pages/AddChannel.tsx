import { useState } from 'react';
import { InputBox } from '../component/common/InputBox';

interface IUser {
  id: number;
  name: string;
}

const Divider = () => <hr className="w-[90%] border-gray-300 my-5" />;

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
    <main className="w-[393px] h-[852px] bg-white">
      <section className="w-full h-[95%] flex flex-col items-center">
        <InputBox
          className="placeholder:text-xs"
          placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길"
        />
        <Divider />
        <section className="w-[90%] space-y-2">
          {users.map(user => (
            <div className="flex flex-row space-x-5" key={user.id}>
              <div className="w-[60px] h-[45px] flex items-center justify-center text-sm border border-gray-300">
                {user.name}
              </div>
              <div className="flex w-[80%] m-0 h-[45px] text-xs text-gray-400 items-center justify-center bg-gray-100 rounded-sm">
                클릭시 출발지/도착지, 경로 설정 가능
              </div>
            </div>
          ))}
        </section>
        <section className="flex flex-row my-4 text-2xs text-gray-400 gap-[10px] items-center justify-center">
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
        <section className="w-[90%] flex justify-end">
          <button onClick={addUser} className="w-[75%] border border-gray-300 text-xs p-2 rounded">
            사용자 추가
          </button>
        </section>
      </section>
    </main>
  );
};
