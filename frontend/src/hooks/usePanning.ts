import { useRef } from 'react';

interface IUsePanningProps {
  viewPosRef: React.MutableRefObject<{ x: number; y: number }>;
  draw: () => void;
}

const INITIAL_POSITION = { x: 0, y: 0 };

export const usePanning = (props: IUsePanningProps) => {
  const panningRef = useRef(false);
  const startPosRef = useRef(INITIAL_POSITION);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panningRef.current || !props.viewPosRef.current) return;

    const viewPos = props.viewPosRef.current;
    const { x, y } = startPosRef.current;

    viewPos.x = e.clientX - x;
    viewPos.y = e.clientY - y;

    props.draw();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!props.viewPosRef.current) return;

    const viewPos = props.viewPosRef.current;
    startPosRef.current = {
      x: e.clientX - viewPos.x,
      y: e.clientY - viewPos.y,
    };
    panningRef.current = true;
  };

  const handleMouseUp = () => {
    panningRef.current = false;
  };

  return { handleMouseMove, handleMouseDown, handleMouseUp };
};
