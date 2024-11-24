// import { Canvas, ICanvasRefMethods } from '@/component/canvas/Canvas.tsx';
// import { Map, IMapRefMethods } from '@/component/maps/Map.tsx';
// import classNames from 'classnames';
// import { ICanvasVertex } from '@/utils/screen/canvasUtils.ts';
// import { INaverMapVertexPosition } from '@/component/maps/naverMapUtils.ts';
// import { useRef, useEffect, useState } from 'react';
//
// interface ICanvasWithMapProps {
//   className?: string;
//   lat: number;
//   lng: number;
//   zoom: number;
//   mapType: string;
//   allowCanvas?: boolean;
// }
//
// interface IMouseEventState {
//   isMouseDown: boolean;
//   mouseDownPosition: { x: number; y: number };
//   // mouseMovePosition: { x: number; y: number };
//   mouseDeltaPosition: { x: number; y: number };
// }
//
// export interface ILocationObject {
//   canvas: ICanvasVertex;
//   map: INaverMapVertexPosition;
// }
//
// const MouseEventStateInitialValue = {
//   isMouseDown: false,
//   mouseDownPosition: { x: 0, y: 0 },
//   // mouseMovePosition: { x: 0, y: 0 },
//   mouseDeltaPosition: { x: 0, y: 0 },
// };
//
// export const CanvasWithMap = (props: ICanvasWithMapProps) => {
//   const mapRefMethods = useRef<IMapRefMethods | null>(null);
//   const mapElement = useRef<HTMLElement | null>(null);
//   const canvasRefMethods = useRef<ICanvasRefMethods | null>(null);
//   const canvasElement = useRef<HTMLCanvasElement | null>(null);
//   const mouseEventState = useRef<IMouseEventState>({ ...MouseEventStateInitialValue });
//   const [mapObject, setMapObject] = useState<naver.maps.Map | null>(null);
//
//   useEffect(() => {
//     if (canvasRefMethods.current?.getCanvasElement)
//       canvasElement.current = canvasRefMethods.current.getCanvasElement();
//   }, []);
//
//   useEffect(() => {
//     mapElement.current = mapRefMethods.current?.getMapContainer() ?? null;
//   }, [mapObject]);
//
//   const initMap = (mapObj: naver.maps.Map | null) => {
//     setMapObject(mapObj);
//   };
//
//   const handleClick = (event: React.MouseEvent) => {
//     mapRefMethods.current?.onMouseClickHandler(event);
//     canvasRefMethods.current?.onMouseClickHandler(event);
//   };
//
//   const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
//     if (!mapElement.current || !canvasElement.current) return;
//     mouseEventState.current.isMouseDown = true;
//     mouseEventState.current.mouseDownPosition = { x: event.clientX, y: event.clientY };
//     canvasRefMethods.current?.onMouseDownHandler(event);
//   };
//
//   const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
//     if (!mapElement.current || !canvasElement.current || !mouseEventState.current.isMouseDown)
//       return;
//
//     // TODO: 쓰로틀링 걸기
//     mouseEventState.current.mouseDeltaPosition = {
//       x: -(event.clientX - mouseEventState.current.mouseDownPosition.x),
//       y: -(event.clientY - mouseEventState.current.mouseDownPosition.y),
//     };
//
//     mapObject?.panBy(
//       new naver.maps.Point(
//         mouseEventState.current.mouseDeltaPosition.x,
//         mouseEventState.current.mouseDeltaPosition.y,
//       ),
//     );
//
//     canvasRefMethods.current?.onMouseMoveHandler(event);
//   };
//
//   const handleMouseUp = (event: React.MouseEvent) => {
//     if (!mapElement.current || !canvasElement.current) return;
//     mouseEventState.current = { ...MouseEventStateInitialValue };
//     canvasRefMethods.current?.onMouseUpHandler(event);
//   };
//
//   return (
//     <div
//       className={classNames('relative h-screen', props.className)}
//       onClick={handleClick}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {props.allowCanvas && <Canvas ref={canvasRefMethods} />}
//       <Map
//         lat={props.lat}
//         lng={props.lng}
//         type={props.mapType}
//         zoom={props.zoom}
//         ref={mapRefMethods}
//         initMap={initMap}
//       />
//     </div>
//   );
// };
