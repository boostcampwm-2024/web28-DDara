import { IMapOptions } from '@/component/maps/Map.tsx';

// lat: 위도(y), lng: 경도(x)
export interface INaverMapVertexPosition {
  ne: {
    lng: number;
    lat: number;
  };
  nw: {
    lng: number;
    lat: number;
  };
  se: {
    lng: number;
    lat: number;
  };
  sw: {
    lng: number;
    lat: number;
  };
}

export const getNaverMapVertexPosition = (map: naver.maps.Map): INaverMapVertexPosition => {
  const bounds = map.getBounds() as naver.maps.LatLngBounds;
  const sw = bounds.getSW();
  const ne = bounds.getNE();
  return {
    se: {
      lng: ne.lng(),
      lat: sw.lat(),
    },
    sw: {
      lng: sw.lng(),
      lat: sw.lat(),
    },
    ne: {
      lng: ne.lng(),
      lat: ne.lat(),
    },
    nw: {
      lng: sw.lng(),
      lat: ne.lat(),
    },
  };
};

export const setNaverMapOption = (mapOptions: IMapOptions): IMapOptions => {
  return {
    ...mapOptions,
    lat: mapOptions.lat ? mapOptions.lat : 37.42829747263545,
    lng: mapOptions.lng ? mapOptions.lng : 126.76620435615891,
    zoom: mapOptions.zoom ? mapOptions.zoom : 20,
  };
};

// utils에 있는 일반 함수로 사용
export const setNaverMap = (
  htmlElement: HTMLElement,
  mapOptions: IMapOptions,
): Promise<naver.maps.Map> => {
  const { lat, lng, ...restProps } = setNaverMapOption(mapOptions);

  return new Promise(resolve => {
    const map = new naver.maps.Map(htmlElement, {
      center: new naver.maps.LatLng(lat, lng),
      ...restProps,
    });

    resolve(map);
  });
};
