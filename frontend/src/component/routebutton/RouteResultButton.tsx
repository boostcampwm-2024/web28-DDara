import { IUser } from '@/context/UserContext';
import classNames from 'classnames';
import { GoArrowRight } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { ChannelContext } from '@/context/ChannelContext';
import { useContext } from 'react';
import { Page } from './enum';

interface IRouteResultButtonProps {
  user: IUser;
  deleteUser?: (index: number) => void;
  page?: Page;
}

export const RouteResultButton = (props: IRouteResultButtonProps) => {
  const { channelInfo } = useContext(ChannelContext);
  const navigate = useNavigate();

  const goToUserDrawRoute = (user: string) => {
    navigate(`/add-channel/${user}/draw`);
  };

  const copyLinkToClipboard = () => {
    const url = `https://ddara.kro.kr/channel/${channelInfo.id}/guest/${props.user.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(
          `${channelInfo.name} 경로의 링크가 복사되었습니다\n 사용자에게 링크를 보내주세요!\n\n ${url}`,
        ); // 복사 성공 메시지
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다.'); // 복사 실패 시 처리
      });
  };

  return (
    <div className="flex flex-row items-center justify-start space-x-2" key={props.user.id}>
      <div className="shadow-userName border-grayscale-400 flex h-11 w-16 items-center justify-center rounded-lg border text-xs">
        <p className="font-nomal">{props.user.name}</p>
      </div>
      <button
        type="button"
        onClick={props.page === Page.ADD ? () => goToUserDrawRoute(props.user.name) : () => {}}
      >
        <div
          className={classNames(
            'm-0 flex h-11 flex-row items-center justify-center rounded-md text-xs font-semibold',
            props.page === Page.ADD ? 'w-56' : 'w-44',
          )}
        >
          <div className="h-full w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 px-2 py-[16px] text-start text-xs font-normal">
            {props.user.start_location.title}
          </div>
          <GoArrowRight className="mx-2 h-8 w-8" />
          <div className="h-full w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 px-2 py-[16px] text-start text-xs font-normal">
            {props.user.end_location.title}
          </div>
        </div>
      </button>
      {props.page === Page.UPDATE && (
        <button
          type="button"
          className="shadow-userName border-grayscale-400 flex h-11 w-20 items-center justify-center gap-1 rounded-lg border text-xs"
          onClick={copyLinkToClipboard}
        >
          <FaLink />
          링크 복사
        </button>
      )}
      {props.user.index > 1 && props.page === Page.ADD && (
        <button type="button" onClick={() => props.deleteUser?.(props.user.index)}>
          <IoClose className="text-grayscale-400 h-6 w-6" />
        </button>
      )}
    </div>
  );
};
