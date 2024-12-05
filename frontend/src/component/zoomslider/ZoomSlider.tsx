import React, { useEffect, useState } from 'react';
import { MdOutlineAdd, MdRemove } from 'react-icons/md';
import './ZoomSlider.css';

interface IZoomSliderProps {
  /** Naver 지도 객체 */
  map: naver.maps.Map | null;
  /** 캔버스를 다시 그리는 함수 */
  redrawCanvas: () => void;
}

interface IZoomButtonProps {
  label: React.ReactNode;
  onClick: () => void;
}

interface IZoomSliderInputProps {
  zoomLevel: number;
  onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZoomButton = ({ label, onClick }: IZoomButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="text-grayscale-500 flex w-full items-center justify-center rounded border-b border-t py-2 focus:outline-none"
  >
    {label}
  </button>
);

const ZoomSliderInput = ({ zoomLevel, onSliderChange }: IZoomSliderInputProps) => {
  const minZoom = 6;
  const maxZoom = 22;

  const getBackgroundStyle = () => {
    const gradientValue = ((zoomLevel - minZoom) / (maxZoom - minZoom)) * 100;
    return `linear-gradient(to right, #333C4A 0%, #333C4A ${gradientValue}%, #ececec ${gradientValue}%, #ececec 100%)`;
  };

  return (
    <div className="range-slider-container relative flex w-[130px] flex-grow items-center justify-center px-1">
      <input
        id="rangeInput"
        type="range"
        min={minZoom}
        max={maxZoom}
        value={zoomLevel}
        onChange={onSliderChange}
        className="rangeInput h-1 w-full appearance-none rounded-full focus:outline-none"
        style={{
          background: getBackgroundStyle(),
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
        }}
      />
      <div
        className="absolute flex items-center justify-center"
        style={{
          height: '100%',
          bottom: 0,
        }}
      />
    </div>
  );
};

export const ZoomSlider = ({ map, redrawCanvas }: IZoomSliderProps) => {
  const [zoomLevel, setZoomLevel] = useState(map?.getZoom() ?? 10);

  useEffect(() => {
    if (!map) return undefined;
    const updateZoomLevel = () => setZoomLevel(map.getZoom());
    const listener = naver.maps.Event.addListener(map, 'zoom_changed', updateZoomLevel);
    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [map]);

  const handleZoomChange = (zoomChange: number) => {
    if (map) {
      const newZoom = Math.max(6, Math.min(22, zoomLevel + zoomChange));
      map.setZoom(newZoom);
      setZoomLevel(newZoom);
      redrawCanvas();
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseInt(event.target.value, 10);
    if (map) {
      map.setZoom(newZoom);
      setZoomLevel(newZoom);
      redrawCanvas();
    }
  };

  return (
    <div
      className="flex h-48 w-9 flex-col items-center rounded bg-white shadow"
      onTouchMove={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <ZoomButton label={<MdOutlineAdd />} onClick={() => handleZoomChange(1)} />
      <ZoomSliderInput zoomLevel={zoomLevel} onSliderChange={handleSliderChange} />
      <ZoomButton label={<MdRemove />} onClick={() => handleZoomChange(-1)} />
    </div>
  );
};
