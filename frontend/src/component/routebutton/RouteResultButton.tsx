/* eslint-disable no-nested-ternary */
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
  setUserName?: (index: number, newName: string) => void;
  deleteUser?: (index: number) => void;
  page?: Page;
  isGuest?: boolean;
  showAlert?: (message: string) => void;
}

export const RouteResultButton = (props: IRouteResultButtonProps) => {
  const { channelInfo } = useContext(ChannelContext);
  const navigate = useNavigate();

  const goToUserDrawRoute = (user: string) => {
    const userExists = channelInfo.guests?.some(guest => guest.name === user);
    if (!userExists) navigate(`/add-channel/${user}/draw`);
  };

  const copyLinkToClipboard = () => {
    const url = `https://ddara.kro.kr/channel/${channelInfo.id}/guest/${props.user.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        props.showAlert?.(
          `${channelInfo.name} 경로의 링크가 복사되었습니다\n${props.user.name}에게 링크를 보내주세요!\n\n${url}`,
        );
      })
      .catch(() => {
        props.showAlert?.(`링크 복사에 실패했습니다.`);
      });
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.setUserName) {
      props.setUserName(props.user.index, event.target.value);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center" key={props.user.id}>
      <div className="shadow-userName border-grayscale-400 flex h-11 w-16 items-center justify-center rounded-lg border text-xs">
        <input
          type="text"
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center font-normal leading-none"
          value={props.user.name}
          onChange={e => {
            handleChangeName(e);
          }}
          disabled={props.isGuest}
        />
      </div>
      <button
        className="px-2"
        type="button"
        onClick={props.page === Page.ADD ? () => goToUserDrawRoute(props.user.name) : () => {}}
      >
        <div
          className={classNames(
            'm-0 flex h-11 flex-row items-center justify-center rounded-md text-xs font-semibold leading-none',
            props.page === Page.ADD ? 'w-56' : 'w-44',
          )}
        >
          <div
            className={classNames(
              'jusify-center flex h-full items-center rounded border-2 px-2 text-start text-xs font-normal',
              props.page === Page.ADD ? 'w-24' : 'w-16',
            )}
          >
            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {props.user.start_location.title}
            </div>
          </div>
          <GoArrowRight className="mx-2 h-4 w-4" />
          <div
            className={classNames(
              'jusify-center flex h-full items-center rounded border-2 px-2 text-start text-xs font-normal',
              props.page === Page.ADD ? 'w-24' : 'w-16',
            )}
          >
            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {props.user.end_location.title}
            </div>
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
      {props.isGuest && props.setUserName ? (
        <div className="h-6 w-6" />
      ) : props.user.index === 1 && props.page === Page.ADD ? (
        <div className="h-6 w-6" />
      ) : (
        // 3. 나머지 사용자에 대해 X 버튼 렌더링
        props.user.index > 1 &&
        props.page === Page.ADD && (
          <button type="button" onClick={() => props.deleteUser?.(props.user.index)}>
            <IoClose className="text-grayscale-400 h-6 w-6" />
          </button>
        )
      )}
    </div>
  );
};
