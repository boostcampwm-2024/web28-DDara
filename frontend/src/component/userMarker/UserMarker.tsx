import { MdLocationOn } from 'react-icons/md';
import { IGuestData } from '@/types/channel.types.ts';

interface IUserMarkerProps {
  userData: IGuestData[];
}

export const UserMarker = (props: IUserMarkerProps) => {
  return (
    <div className="z-4000 absolute bottom-8 right-5 w-fit text-base">
      <ul className="flex flex-col gap-1">
        {props.userData.map(data => (
          <li key={data.name} className="flex items-center">
            <MdLocationOn color={data.markerStyle.color} className="size-5" />
            {data.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
