import { IUser } from '@/context/UserContext';
import { getAddressFromCoordinates } from '@/utils/map/getAddress';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface IRouteResultButtonProps {
  user: IUser;
  deleteUser: (id: number) => void;
}

export const RouteResultButton = (props: IRouteResultButtonProps) => {
  const navigate = useNavigate();
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  useEffect(() => {
    // Fetch the addresses asynchronously when component mounts
    const fetchAddresses = async () => {
      const startAddress = await getAddressFromCoordinates(
        props.user.start_location.lat,
        props.user.start_location.lng,
      );
      const endAddress = await getAddressFromCoordinates(
        props.user.end_location.lat,
        props.user.end_location.lng,
      );
      setStart(startAddress); // Set start address
      setEnd(endAddress); // Set end address
    };

    fetchAddresses();
  }, [props.user.start_location, props.user.end_location]);

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
          <div className="flex h-full w-28 items-center rounded border-2 px-2 text-xs font-normal">
            {start}
          </div>
          <GoArrowRight className="mx-2 h-6 w-6" />
          <div className="flex h-full w-28 items-center rounded border-2 px-2 text-xs font-normal">
            {end}
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
