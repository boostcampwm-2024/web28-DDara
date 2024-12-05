import classNames from 'classnames';
import { MdMyLocation } from 'react-icons/md';

interface ISetCurruntLocationButton {
  map: naver.maps.Map | null;
  lat: number | null;
  lng: number | null;
  isMain?: boolean;
}

export const SetCurruntLocationButton = (props: ISetCurruntLocationButton) => {
  const handleCurrentLocationButton = () => {
    if (props.lat && props.lng) {
      props.map?.setCenter(new window.naver.maps.LatLng(props.lat, props.lng));
      props.map?.setZoom(14);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleCurrentLocationButton()}
      className={classNames(
        'bg-blueGray-800 shadow-floatButton absolute flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300',
        props.isMain ? 'bottom-2 left-2' : 'bottom-5 left-5',
      )}
    >
      <MdMyLocation />
    </button>
  );
};
