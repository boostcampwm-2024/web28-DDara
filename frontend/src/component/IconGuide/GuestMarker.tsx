import { MdAssistantNavigation, MdFlag, MdLocationOn } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { ReactNode, useMemo } from 'react';

interface IMarkerData {
  name: string;
  icon: ReactNode;
}

interface IGuestMarkerProps {
  markerColor: string;
}

export const GusetMarker = (props: IGuestMarkerProps) => {
  const markerData: IMarkerData[] = [
    { name: '내 위치', icon: <MdAssistantNavigation color={props.markerColor && 'black'} /> },
    { name: '도착지', icon: <MdFlag color={props.markerColor && 'black'} /> },
    { name: '출발지', icon: <MdLocationOn color={props.markerColor && 'black'} /> },
  ];

  const iconContextValue = useMemo(() => ({ color: 'purple', className: 'size-5' }), []);

  return (
    <div className="z-4000 absolute bottom-8 right-5 w-fit text-base">
      <ul className="flex flex-col gap-1">
        <IconContext.Provider value={iconContextValue}>
          {markerData.map(data => (
            <li className="flex items-center justify-between gap-2">
              {data.icon}
              <span>{data.name}</span>
            </li>
          ))}
        </IconContext.Provider>
      </ul>
    </div>
  );
};
