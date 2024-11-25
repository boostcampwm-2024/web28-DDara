// import { IMapOptions } from '@/component/maps/Map.types.ts';
//
// export const setNaverMapOption = (mapOptions: IMapOptions): IMapOptions => {
//   return {
//     ...mapOptions,
//     lat: mapOptions.lat ? mapOptions.lat : 37.42829747263545,
//     lng: mapOptions.lng ? mapOptions.lng : 126.76620435615891,
//     zoom: mapOptions.zoom ? mapOptions.zoom : 20,
//   };
// };
//
// export const setNaverMap = (
//   htmlElement: HTMLElement,
//   mapOptions: IMapOptions,
// ): Promise<naver.maps.Map> => {
//   const { lat, lng, ...restProps } = setNaverMapOption(mapOptions);
//
//   return new Promise(resolve => {
//     const map = new naver.maps.Map(htmlElement, {
//       center: new naver.maps.LatLng(lat, lng),
//       ...restProps,
//     });
//
//     resolve(map);
//   });
// };
//
// export const setNaverMapSync = (
//   htmlElement: HTMLElement,
//   mapOptions: IMapOptions,
// ): naver.maps.Map => {
//   const { lat, lng, ...restProps } = setNaverMapOption(mapOptions);
//
//   return new naver.maps.Map(htmlElement, {
//     center: new naver.maps.LatLng(lat, lng),
//     ...restProps,
//   });
// };
