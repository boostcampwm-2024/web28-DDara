import { useEffect, useRef } from 'react';
import { setNaverMapSync } from '@/component/maps/naverMapUtils';

export interface INaverMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}
interface INaverMapProps extends INaverMapOptions {
  otherLocations?: Array<{ location: { lat: number; lng: number }; token: string }>;
}

export const NaverMap = (props: INaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<Map<string, naver.maps.Marker>>(new Map());
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);

  // TODO: 사용자 순서 별로 색상 정하기 (util 함수로 빼기)
  const getMarkerColor = (token: string) => {
    // 문자열 해싱을 통해 고유 숫자 생성
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      hash = token.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 해시 값을 기반으로 RGB 값 생성
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    // RGB를 HEX 코드로 변환
    return `rgb(${r}, ${g}, ${b})`;
  };

  const mapOptions: INaverMapOptions = {
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = setNaverMapSync(mapRef.current, mapOptions);
      mapInstanceRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && props.otherLocations) {
      const map = mapInstanceRef.current;

      // 업데이트된 마커 관리
      const existingMarkers = markersRef.current;

      props.otherLocations.forEach(({ location, token }) => {
        const markerColor = getMarkerColor(token);
        if (existingMarkers.has(token)) {
          // 기존 마커 위치 업데이트
          const marker = existingMarkers.get(token);
          marker?.setPosition(new naver.maps.LatLng(location.lat, location.lng));
        } else {
          const newMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(location.lat, location.lng),
            map,
            icon: {
              content: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
              anchor: new naver.maps.Point(10, 10),
            },
          });

          existingMarkers.set(token, newMarker);
        }
      });

      // 삭제된 마커 제거
      existingMarkers.forEach((marker, token) => {
        if (!props.otherLocations?.some(loc => loc.token === token)) {
          marker.setMap(null);
          existingMarkers.delete(token);
        }
      });
    }
  }, [props.otherLocations]);

  // 현재 위치 마커 추가 및 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      // 현재 위치 마커 생성
      userMarkerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(props.lat, props.lng),
        map,
        icon: {
          content: `<div style="background-color: blue; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white;"></div>`,
          anchor: new naver.maps.Point(12.5, 12.5),
        },
      });
    }
  }, [props.lat, props.lng]);

  return <section ref={mapRef} className="h-full w-full" />;
};