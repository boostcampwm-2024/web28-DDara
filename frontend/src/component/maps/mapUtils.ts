import { IMapVertexCoordinate, IMapObject, IMapLatLngBound } from '@/component/maps/Map.types.ts';

export const getMapVertexCoordinate = (map: IMapObject): IMapVertexCoordinate => {
  let bounds: IMapLatLngBound;

  if (map instanceof naver.maps.Map) {
    bounds = map.getBounds() as naver.maps.LatLngBounds;
  } else {
    throw new Error('🚀 꼭지점 좌표 가져오기 오류 : 지도 객체가 없습니다.');
  }

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
