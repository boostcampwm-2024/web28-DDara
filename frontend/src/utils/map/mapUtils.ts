import { IPoint } from '@/types/channel.types';

const calculateZoomLevel = (latDiff: number, lngDiff: number) => {
  const maxDiff = Math.max(latDiff, lngDiff);
  if (maxDiff < 0.0005) return 19;
  if (maxDiff < 0.001) return 18;
  if (maxDiff < 0.004) return 17;
  if (maxDiff < 0.01) return 15;
  if (maxDiff < 0.03) return 14;
  if (maxDiff < 0.05) return 13;
  if (maxDiff < 0.1) return 12;
  if (maxDiff < 0.2) return 11;
  if (maxDiff < 0.5) return 10;
  if (maxDiff < 1) return 9;
  if (maxDiff < 2) return 8;
  if (maxDiff < 5) return 8;
  if (maxDiff < 10) return 7;
  return 5;
};

export const zoomMapView = (map: any, markers: IPoint[]) => {
  if (markers.length === 0) return;

  const latitudes = markers.map(marker => marker.lat);
  const longitudes = markers.map(marker => marker.lng);

  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLng = Math.max(...longitudes);
  const minLng = Math.min(...longitudes);

  const centerLat = (maxLat + minLat) / 2;
  const centerLng = (maxLng + minLng) / 2;

  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const zoomLevel = calculateZoomLevel(latDiff, lngDiff);

  // 지도 중심과 줌 레벨 설정
  map?.setCenter(new window.naver.maps.LatLng(centerLat, centerLng));
  map?.setZoom(zoomLevel);
};
