export type IMapObject = naver.maps.Map;

export type IMapLatLngBound = naver.maps.LatLngBounds;

export interface IMapOptions {
  lat: number;
  lng: number;
  zoom?: number;
}

/**
 * Forward Ref 를 통해서, 부모에서 자식 컴포넌트의 Ref에 접근할 때 쓰이는 인터페이스.
 * 다음과 같은 목적으로 쓰인다.
 *    1. 지도 컨테이너 요소와, 지도 객체를 가져온다.
 *    2. 지도 객체의 이벤트 위임을 위해 자신을 컨트롤 할 수 있는 Handler를 부모에게 전달하는 역할을 한다.
 * 이렇게 전달받은 핸들러로 부모 컴포넌트에서 자식에 있는 지도 객체를 컨트롤 할 수 있다.
 * */
export interface IMapRefMethods {
  getMapObject: () => naver.maps.Map | null;
  getMapContainer: () => HTMLElement | null;
  onMouseClickHandler: (event?: React.MouseEvent) => void;
}

// lat: 위도(y), lng: 경도(x) INaverMapVertexPosition
export interface IMapVertexCoordinate {
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
