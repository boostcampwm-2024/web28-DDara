import { useEffect, useState } from 'react';

interface IGetUserLocation {
  lat: number | null;
  lng: number | null;
  alpha: number | null;
  error: string | null;
}

/**
 * 사용자 위치를 가져오는 커스텀 Hook입니다.
 *
 * @returns {IGetUserLocation} 사용자 위치 (위도, 경도)와 에러 메시지를 포함한 객체를 반환합니다.
 *
 * @remarks
 * - Geolocation API를 사용하여 사용자의 현재 위치를 가져옵니다.
 * - 위치를 성공적으로 가져오지 못하면 기본 위치 네이버 1784 (37.3595704, 127.105399)로 설정됩니다.
 * - Geolocation API가 지원되지 않는 경우에도 기본 위치로 설정됩니다.
 *
 * @example
 * ```tsx
 * const { lat, lng, error } = getUserLocation();
 *
 * if (error) {
 *   console.error('위치 가져오기 에러:', error);
 * } else {
 *   console.log('현재 위치:', lat, lng);
 * }
 * ```
 */

export const getUserLocation = (): IGetUserLocation => {
  const [location, setLocation] = useState<IGetUserLocation>({
    lat: null,
    lng: null,
    alpha: null,
    error: null,
  });

  useEffect(() => {
    let watchId: number;

    const handlePosition = (position: GeolocationPosition) => {
      setLocation(prev => ({
        ...prev,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        error: null,
      }));
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation({
        lat: 37.3595704,
        lng: 127.105399,
        alpha: 0,
        error: error.message,
      });
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      });
    } else {
      setLocation({
        lat: 37.3595704,
        lng: 127.105399,
        alpha: 0,
        error: '현재 위치를 불러오지 못했습니다',
      });
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setLocation(prev => ({ ...prev, alpha: event.alpha }));
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return location;
};
