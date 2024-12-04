import { MdFlag, MdLocationOn } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { ReactNode, useMemo } from 'react';
import { START_MARKER_COLOR, END_MARKER_COLOR, PATH_COLOR } from '@/lib/constants/canvasConstants';
import { IoFootsteps } from 'react-icons/io5';

interface IMarkerData {
  name: string;
  icon: ReactNode;
}

interface IGuestMarkerProps {
  markerColor: string;
}

export const GuestMarker = (props: IGuestMarkerProps) => {
  const markerData: IMarkerData[] = [
    {
      name: '경로',
      icon: <IoFootsteps color={props.markerColor && PATH_COLOR} />,
    },
    { name: '도착지', icon: <MdFlag color={props.markerColor && END_MARKER_COLOR} /> },
    { name: '출발지', icon: <MdLocationOn color={props.markerColor && START_MARKER_COLOR} /> },
  ];

  const iconContextValue = useMemo(() => ({ color: 'purple', className: 'size-5' }), []);

  return (
    <div className="z-4000 absolute bottom-8 right-5 w-fit text-base">
      <ul className="flex flex-col gap-1">
        <IconContext.Provider value={iconContextValue}>
          {markerData.map(data => (
            <li className="flex items-center justify-between gap-2" key={data.name}>
              {data.icon}
              <span>{data.name}</span>
            </li>
          ))}
        </IconContext.Provider>
      </ul>
    </div>
  );
};
