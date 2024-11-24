// /* eslint-disable */
// import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import classNames from 'classnames';
// import { ButtonState } from '@/component/common/enums';
// import { useFloatingButton } from '@/hooks/useFloatingButton';
// import { FloatingButton } from '@/component/common/floatingbutton/FloatingButton';
// import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';
//
// interface ICanvasProps {
//   className?: string;
//   onPointConverted?: (latLng: { lat: number; lng: number }) => { x: number; y: number } | null;
//   onPointReverted?: (point: { x: number; y: number }) => { lat: number; lng: number } | null;
// }
//
// interface IPoint {
//   x: number;
//   y: number;
//   latLng?: { lat: number; lng: number };
// }
//
// interface ICanvasRefMethods {
//   getCanvasElement: () => HTMLCanvasElement | null;
//   setScale: (scale: number) => void;
//   setPosition: (x: number, y: number) => void;
//   clear: () => void;
//   redraw: () => void;
// }
//
// // 선의 스타일 상수
// const LINE_WIDTH = 2;
// const STROKE_STYLE = 'black';
// const START_MARKER_COLOR = '#4CAF50';
// const END_MARKER_COLOR = '#F44336';
// const MARKER_RADIUS = 6;
//
// export const Canvas = forwardRef<ICanvasRefMethods, ICanvasProps>((props, ref) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [points, setPoints] = useState<IPoint[]>([]);
//   const [undoStack, setUndoStack] = useState<IPoint[][]>([]);
//   const [redoStack, setRedoStack] = useState<IPoint[][]>([]);
//   const [startPoint, setStartPoint] = useState<IPoint | null>(null);
//   const [endPoint, setEndPoint] = useState<IPoint | null>(null);
//   const { isMenuOpen, toolType, toggleMenu, handleMenuClick } = useFloatingButton();
//
//   // Transform state
//   const scaleRef = useRef<number>(1);
//   const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//
//     redraw();
//   }, []);
//
//   const clear = () => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext('2d');
//     if (!canvas || !context) return;
//
//     context.clearRect(0, 0, canvas.width, canvas.height);
//   };
//
//   const drawMarker = (context: CanvasRenderingContext2D, point: IPoint, color: string) => {
//     const scaledRadius = MARKER_RADIUS / scaleRef.current;
//
//     context.beginPath();
//     context.arc(
//       (point.x - offsetRef.current.x) / scaleRef.current,
//       (point.y - offsetRef.current.y) / scaleRef.current,
//       scaledRadius,
//       0,
//       2 * Math.PI,
//     );
//     context.fillStyle = color;
//     context.fill();
//     context.strokeStyle = 'white';
//     context.lineWidth = 2 / scaleRef.current;
//     context.stroke();
//   };
//
//   const redraw = () => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext('2d');
//     if (!canvas || !context) return;
//
//     clear();
//
//     // Set line style
//     context.lineWidth = LINE_WIDTH / scaleRef.current;
//     context.strokeStyle = STROKE_STYLE;
//     context.lineCap = 'round';
//     context.lineJoin = 'round';
//
//     // Draw lines
//     if (points.length > 0) {
//       context.beginPath();
//       points.forEach((point, index) => {
//         const x = (point.x - offsetRef.current.x) / scaleRef.current;
//         const y = (point.y - offsetRef.current.y) / scaleRef.current;
//
//         if (index === 0) {
//           context.moveTo(x, y);
//         } else {
//           context.lineTo(x, y);
//         }
//       });
//       context.stroke();
//     }
//
//     // Draw markers
//     if (startPoint) {
//       drawMarker(context, startPoint, START_MARKER_COLOR);
//     }
//     if (endPoint) {
//       drawMarker(context, endPoint, END_MARKER_COLOR);
//     }
//   };
//
//   const addPoint = (point: IPoint) => {
//     setPoints(prev => {
//       const newPoints = [...prev, point];
//       setUndoStack(stack => [...stack, prev]);
//       setRedoStack([]);
//       return newPoints;
//     });
//   };
//
//   const undo = () => {
//     if (undoStack.length === 0) return;
//
//     const previousPoints = undoStack[undoStack.length - 1];
//     setPoints(previousPoints);
//     setUndoStack(stack => stack.slice(0, -1));
//     setRedoStack(stack => [...stack, points]);
//     redraw();
//   };
//
//   const redo = () => {
//     if (redoStack.length === 0) return;
//
//     const nextPoints = redoStack[redoStack.length - 1];
//     setPoints(nextPoints);
//     setRedoStack(stack => stack.slice(0, -1));
//     setUndoStack(stack => [...stack, points]);
//     redraw();
//   };
//
//   const handleCanvasClick = (e: React.MouseEvent) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) * scaleRef.current + offsetRef.current.x;
//     const y = (e.clientY - rect.top) * scaleRef.current + offsetRef.current.y;
//
//     // Convert to lat/lng if converter is provided
//     let latLng;
//     if (props.onPointReverted) {
//       latLng = props.onPointReverted({ x, y });
//     }
//
//     // @ts-ignore
//     const point: IPoint = { x, y, latLng };
//
//     switch (toolType) {
//       case ButtonState.LINE_DRAWING:
//         addPoint(point);
//         break;
//       case ButtonState.START_MARKER:
//         setStartPoint(point);
//         break;
//       case ButtonState.DESTINATION_MARKER:
//         setEndPoint(point);
//         break;
//       default:
//         addPoint(point);
//         break;
//     }
//
//     redraw();
//   };
//
//   useImperativeHandle(ref, () => ({
//     getCanvasElement: () => canvasRef.current,
//     setScale: (scale: number) => {
//       scaleRef.current = scale;
//       redraw();
//     },
//     setPosition: (x: number, y: number) => {
//       offsetRef.current = { x, y };
//       redraw();
//     },
//     clear,
//     redraw,
//   }));
//
//   return (
//     <div className="absolute left-0 top-0 h-full w-full">
//       <div className="absolute left-1/2 top-[10px] z-10 flex -translate-x-1/2 transform gap-2">
//         <button
//           type="button"
//           onClick={undo}
//           disabled={undoStack.length === 0}
//           className={classNames(
//             'h-[35px] w-[35px]',
//             undoStack.length === 0 ? 'cursor-not-allowed opacity-50' : '',
//           )}
//         >
//           <MdArrowCircleLeft size={24} />
//         </button>
//         <button
//           type="button"
//           onClick={redo}
//           disabled={redoStack.length === 0}
//           className={classNames(
//             'h-[35px] w-[35px]',
//             redoStack.length === 0 ? 'cursor-not-allowed opacity-50' : '',
//           )}
//         >
//           <MdArrowCircleRight size={24} />
//         </button>
//       </div>
//
//       <canvas
//         ref={canvasRef}
//         className={classNames('absolute h-full w-full bg-transparent', props.className)}
//         onClick={handleCanvasClick}
//       />
//
//       <div className="absolute">
//         <FloatingButton
//           isMenuOpen={isMenuOpen}
//           toggleMenu={toggleMenu}
//           toolType={toolType}
//           handleMenuClick={handleMenuClick}
//         />
//       </div>
//     </div>
//   );
// });
