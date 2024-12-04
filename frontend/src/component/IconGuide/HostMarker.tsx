import { MdAssistantNavigation } from 'react-icons/md';
import { IGuestData } from '@/types/channel.types.ts';

interface IUserMarkerProps {
  guestsData: IGuestData[];
}

export const HostMarker = (props: IUserMarkerProps) => {
  return (
    <div className="z-4000 absolute bottom-8 right-5 w-fit text-base">
      <ul className="flex flex-col gap-2">
        {props.guestsData.map(data => (
          <li key={data.name} className="flex items-center justify-between gap-2">
            <MdAssistantNavigation color={data.markerStyle.color} className="size-5" />
            {data.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
