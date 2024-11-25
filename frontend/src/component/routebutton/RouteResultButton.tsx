import { IUser } from '@/context/UserContext';
import classNames from 'classnames';
import { GoArrowRight } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface IRouteResultButtonProps {
  user: IUser;
  deleteUser: (id: number) => void;
}

export const RouteResultButton = (props: IRouteResultButtonProps) => {
  const navigate = useNavigate();

  const goToUserDrawRoute = (user: string) => {
    navigate(`/add-channel/${user}/draw`);
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-2" key={props.user.id}>
      <div className="shadow-userName border-grayscale-400 flex h-11 w-16 items-center justify-center rounded-lg border text-xs">
        {props.user.name}
      </div>
      <button onClick={() => goToUserDrawRoute(props.user.name)}>
        <div
          className={classNames(
            'm-0 flex h-11 w-56 flex-row items-center justify-center rounded-md text-xs font-semibold',
            props.user.id > 1 ? '' : 'mr-8',
          )}
        >
          <div className="h-full w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 px-2 py-4 text-start text-xs font-normal">
            {props.user.start_location.title}
          </div>
          <GoArrowRight className="mx-2 h-8 w-8" />
          <div className="h-full w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 px-2 py-4 text-start text-xs font-normal">
            {props.user.end_location.title}
          </div>
        </div>
      </button>
      {props.user.id > 1 && (
        <button onClick={() => props.deleteUser(props.user.id)}>
          <IoClose className="text-grayscale-400 h-6 w-6" />
        </button>
      )}
    </div>
  );
};
