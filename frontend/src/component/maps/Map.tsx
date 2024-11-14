import { NaverMap } from '@/component/maps/NaverMap.tsx';
import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';

interface IMapProps {
  lat: number;
  lng: number;
  className?: string;
  type: string;
  zoom?: number;
}

/**
 * @param {string} type
 * @returns {boolean}
 *
 * @remarks
 * - 지도 종류를 입력받아서, 유효한 종류인지 검사합니다.
 */
const validateKindOfMap = (type: string) => ['naver'].includes(type);

/**
 * @param {IMapProps} props
 * @returns {ReactNode}
 *
 * @remarks
 * - 지도 종류를 입력받아서, 해당 지도를 렌더링합니다.
 * - 지도 종류가 유효하지 않으면 에러를 발생시킵니다.
 *
 * @example
 * - 사용 예시
 * ```tsx
 * <Map lat={37.3595704} lng={127.105399} type="naver" />
 * ```
 */
export const Map = (props: IMapProps) => {
  if (!validateKindOfMap(props.type)) throw new Error('Invalid map type');

  const [MapComponent, setMapComponent] = useState<ReactNode>();

  useEffect(() => {
    if (props.type === 'naver') {
      setMapComponent(<NaverMap lat={props.lat} lng={props.lng} zoom={props.zoom} />);
    }
  }, []);

  return (
    <article className={classNames({ 'h-screen': !props.className }, props.className)}>
      {MapComponent}
    </article>
  );
};
