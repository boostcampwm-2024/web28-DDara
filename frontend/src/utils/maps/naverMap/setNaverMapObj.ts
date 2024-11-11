export interface INaverMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}

/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} zoom
 * @returns {INaverMapOptions}
 *
 * @remarks
 * - 위도, 경도, 줌 값을 입력받아서, Naver Map 객체 생성 시 사용할 옵션 객체를 반환합니다.
 */
export const setNaverMapOption = (mapOptions: INaverMapOptions): INaverMapOptions => {
  return {
    ...mapOptions,
    lat: mapOptions.lat ? mapOptions.lat : 37.42829747263545,
    lng: mapOptions.lng ? mapOptions.lng : 126.76620435615891,
    zoom: mapOptions.zoom ? mapOptions.zoom : 20,
  };
};

/**
 *@param {HTMLElement} htmlElement
 *@param {INaverMapOption} mapOptions
 *@returns {naver.maps.Ma
 *
 *@remarks
 *- 지도를 표시할 HTML 요소를 입력받아서, 지도 옵션을 바탕으로 지도를 설정하고, Naver Map 객체를 생성합니다. 그리고 이때 생성한 네이버 지도 객체를 반환합니다.
 *
 *@example
 *- 사용 예시
 *```ts
 *const htmlElement = document.getElementById('map');
 *const mapOptions = {
 *  latitude: 37.3595704,
 *  longitude: 127.105399,
 *  zoom: 10,
 *};
 * const naverMapObj = setNaverMapObj(htmlElement, mapOptions);
 * ```

 *@example
 *- React 컴포넌트에서 사용하는 예시
 *```tsx
 * import { useEffect, useRef } from 'react';
 * import { setNaverMapObj } from '@/utils/maps/naverMap/setNaverMapObj.ts';
 *
 * export const NaverMap = () => {
 * const mapRef = useRef<HTMLDivElement>(null);
 * const mapOptions = {
 * latitude: 37.3595704,
 * longitude: 127.105399,
 * zoom: 10,
 * };
 *
 * useEffect(() => {
 *  if (mapRef.current) {
 *    setNaverMapObj(mapRef.current, mapOptions);
 *  }
 * }, []);
 *
 * return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
 * };
 * ```
 */

// utils에 있는 일반 함수로 사용
export const setNaverMapObj = (
  htmlElement: HTMLElement,
  mapOptions: INaverMapOptions,
): naver.maps.Map => {
  const { lat, lng, ...restProps } = setNaverMapOption(mapOptions);

  return new naver.maps.Map(htmlElement, {
    center: new naver.maps.LatLng(lat, lng),
    ...restProps,
  });
};
