import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { setNaverMap } from '@/component/maps/naverMapUtils.ts';
import { IMapOptions, IMapRefMethods } from '@/component/maps/Map.tsx';

interface INaverMapProps extends IMapOptions {
  onMapInit?: (map: naver.maps.Map) => void; // 콜백 프로퍼티 추가
}

// 현재 위치에서, 외부에 naver.maps.Map 객체를 넘겨줘야 한다.
// 생각해보니, 변수로 설정을 했었는데, 이는 랜더링 될 때마다 초기화 되는 문제가;; 그러면 매번 Map 객체가 새로 만들어지는거니.. 잘 될턱이 있나.
// useRef를 사용해서, Map 객체를 저장하고, 그 객체를 사용하도록 하자.
export const NaverMap = forwardRef<IMapRefMethods, INaverMapProps>((props, ref) => {
  // 네이버 지도 객체를 전달해야, 여기에 있는 메서드를 캔버스에서 쓸 수 있으니 일단 표시
  const naverMapObject = useRef<naver.maps.Map | null>(null);
  // 이건 네이버 지도를 보여주기 위한 컨테이너
  const naverMapContainer = useRef<HTMLElement | null>(null);

  const mapOptions: IMapOptions = {
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom,
  };

  useEffect(() => {
    if (naverMapContainer.current) {
      setNaverMap(naverMapContainer.current, mapOptions).then(mapObject => {
        naverMapObject.current = mapObject;
        if (props.onMapInit && mapObject) {
          props.onMapInit(mapObject); // 콜백 호출
        }
      });
    }
  }, [mapOptions, props]);

  const clickHandler = () => {
    console.log('clicked!');
  };

  useImperativeHandle(ref, () => ({
    getMapObject: () => naverMapObject.current,
    getMapContainer: () => naverMapContainer.current,
  }));

  return <section ref={naverMapContainer} className="h-full w-full" onClick={clickHandler} />;
});
