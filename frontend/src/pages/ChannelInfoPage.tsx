import { useContext, useEffect, useState } from 'react';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { RouteResultButton } from '@/component/routebutton/RouteResultButton';
import { UserContext } from '@/context/UserContext';
import { Page } from '@/component/routebutton/enum';
import { InputBox } from '../component/common/InputBox';

const Divider = () => <hr className="my-6 w-full border-gray-300" />;

export const ChannelInfoPage = () => {
  const [channelName, setChannelName] = useState<string>('');
  const { users } = useContext(UserContext);
  const { setFooterTransparency, resetFooterContext } = useContext(FooterContext);
  const navigate = useNavigate();

  const handleChangeChannelName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  };

  useEffect(() => {
    setFooterTransparency(true);
  }, []);

  const goToAddChannelPage = () => {
    navigate('/add-channel');
    resetFooterContext();
  };

  return (
    <main className="flex h-full w-full flex-col px-8 py-16">
      <Outlet />
      <InputBox
        placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길"
        onChange={handleChangeChannelName}
        value={channelName}
      />
      <Divider />
      <section className="w-full space-y-4">
        {users.map(user => (
          <div key={user.id}>
            <RouteResultButton user={user} page={Page.UPDATE} />
          </div>
        ))}
      </section>
      <section className="text-grayscale-400 my-4 mr-8 flex justify-start gap-[2px] text-xs">
        <HiMiniInformationCircle className="h-4 w-4 text-black" />
        사용자 별로 url을 복사하여 공유할 수 있습니다.
      </section>
      {users.length < 5 && (
        <section className="flex w-full justify-end">
          <button
            type="button"
            onClick={goToAddChannelPage}
            className="bg-grayscale-25 border-gray-75 font-nomal mt-4 h-8 w-40 rounded border p-2 text-xs"
          >
            수정하기
          </button>
        </section>
      )}
    </main>
  );
};
