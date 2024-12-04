import { IUser } from '@/context/UserContext';
import classNames from 'classnames';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface IRouteSettingButtonProps {
  user: IUser;
  deleteUser?: (index: number) => void;
}

export const RouteSettingButton = (props: IRouteSettingButtonProps) => {
  const navigate = useNavigate();

  const goToUserDrawRoute = (user: string) => {
    navigate(`/add-channel/${user}/draw`);
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-2" key={props.user.id}>
      <div className="shadow-userName border-grayscale-400 flex h-11 w-16 items-center justify-center rounded-lg border py-4 text-xs">
        <p className="font-nomal leading-none">{props.user.name}</p>
      </div>
      <button type="button" onClick={() => goToUserDrawRoute(props.user.name)}>
        <div
          className={classNames(
            'text-grayscale-150 bg-grayscale-100 m-0 flex h-11 items-center justify-center rounded-md text-xs font-semibold',
            props.user.index > 1 ? 'w-56' : 'w-64',
          )}
        >
          클릭시 출발지/도착지, 경로 설정 가능
        </div>
      </button>
      {props.user.index > 1 && (
        <button type="button" onClick={() => props.deleteUser?.(props.user.index)}>
          <IoClose className="text-grayscale-400 h-6 w-6" />
        </button>
      )}
    </div>
  );
};
