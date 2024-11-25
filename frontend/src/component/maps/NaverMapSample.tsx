// /* eslint-disable */
// import React, { useEffect, useRef, useState } from 'react';
// import { Canvas } from '@/component/canvas/Canvas';
//
// interface MapPoint {
//   lat: number;
//   lng: number;
// }
//
// interface MapProps {
//   initialCenter?: { lat: number; lng: number };
//   initialZoom?: number;
// }
//
// // 대한민국 영역 제한
// const KOREA_BOUNDS = {
//   sw: { lat: 33.0, lng: 125.0 }, // 서남단
//   ne: { lat: 38.0, lng: 132.0 }, // 동북단
// };
//
// const MIN_ZOOM = 7; // 대한민국 전체가 보이는 최소 줌 레벨
// const MAX_ZOOM = 19; // 네이버 지도 최대 줌 레벨
//
// export const MapWithCanvas: React.FC<MapProps> = ({
//   initialCenter = { lat: 36.5, lng: 127.5 }, // 대한민국 중심점
//   initialZoom = 7,
// }) => {
//   const mapRef = useRef<naver.maps.Map | null>(null);
//   const canvasRef = useRef<any>(null);
//   const [map, setMap] = useState<naver.maps.Map | null>(null);
//
//   // 지도 초기화
//   useEffect(() => {
//     const initializeMap = () => {
//       if (!window.naver) return;
//
//       const mapOptions = {
//         center: new window.naver.maps.LatLng(initialCenter.lat, initialCenter.lng),
//         zoom: initialZoom,
//         minZoom: MIN_ZOOM,
//         maxZoom: MAX_ZOOM,
//         mapTypeControl: false,
//         scaleControl: false,
//         logoControl: false,
//         mapDataControl: false,
//         zoomControl: true,
//         zoomControlOptions: {
//           position: naver.maps.Position.RIGHT_CENTER,
//         },
//       };
//
//       const mapInstance = new window.naver.maps.Map('map', mapOptions);
//
//       // 영역 제한 설정
//       const bounds = new window.naver.maps.LatLngBounds(
//         new window.naver.maps.LatLng(KOREA_BOUNDS.sw.lat, KOREA_BOUNDS.sw.lng),
//         new window.naver.maps.LatLng(KOREA_BOUNDS.ne.lat, KOREA_BOUNDS.ne.lng),
//       );
//
//       mapInstance.setOptions('maxBounds', bounds);
//       mapRef.current = mapInstance;
//       setMap(mapInstance);
//
//       // 지도 이벤트 리스너
//       naver.maps.Event.addListener(mapInstance, 'zoom_changed', () => {
//         updateCanvasPosition();
//       });
//
//       naver.maps.Event.addListener(mapInstance, 'center_changed', () => {
//         updateCanvasPosition();
//       });
//     };
//
//     initializeMap();
//
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.destroy();
//       }
//     };
//   }, []);
//
//   // 캔버스 위치 업데이트
//   const updateCanvasPosition = () => {
//     if (!mapRef.current || !canvasRef.current) return;
//
//     const mapBounds = mapRef.current.getBounds();
//     const projection = mapRef.current.getProjection();
//     const zoom = mapRef.current.getZoom();
//
//     // 캔버스의 위치와 크기를 지도에 맞춤
//     const canvasElement = canvasRef.current.getCanvasElement();
//     if (!canvasElement) return;
//
//     // 캔버스 스케일 조정
//     const scale = Math.pow(2, zoom - MIN_ZOOM);
//     canvasRef.current.setScale(scale);
//
//     // 캔버스 위치 조정
//     const position = projection.fromCoordToOffset(mapRef.current.getCenter());
//     canvasRef.current.setPosition(position.x, position.y);
//   };
//
//   // 지도상의 위경도를 캔버스 좌표로 변환
//   const convertLatLngToPoint = (latLng: MapPoint) => {
//     if (!mapRef.current) return null;
//
//     const projection = mapRef.current.getProjection();
//     const position = projection.fromCoordToOffset(new naver.maps.LatLng(latLng.lat, latLng.lng));
//
//     return {
//       x: position.x,
//       y: position.y,
//     };
//   };
//
//   // 캔버스 좌표를 위경도로 변환
//   const convertPointToLatLng = (point: { x: number; y: number }) => {
//     if (!mapRef.current) return null;
//
//     const projection = mapRef.current.getProjection();
//     const latLng = projection.fromOffsetToCoord(new naver.maps.Point(point.x, point.y));
//
//     return {
//       lat: latLng.y,
//       lng: latLng.x,
//     };
//   };
//
//   return (
//     <div className="relative h-screen w-screen overflow-hidden">
//       <div id="map" className="h-full w-full" />
//       <Canvas
//         ref={canvasRef}
//         className="pointer-events-auto absolute left-0 top-0"
//         onPointConverted={convertLatLngToPoint}
//         onPointReverted={convertPointToLatLng}
//       />
//     </div>
//   );
// };
