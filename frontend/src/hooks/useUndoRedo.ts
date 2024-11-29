import { useState } from 'react';
import { IPoint } from '@/lib/types/canvasInterface.ts';

export const useUndoRedo = (initialPoints: IPoint[]) => {
  const [pathPoints, setPathPoints] = useState<IPoint[]>(initialPoints);
  const [undoStack, setUndoStack] = useState<IPoint[][]>([]);
  const [redoStack, setRedoStack] = useState<IPoint[][]>([]);

  const addPoint = (newPoint: IPoint) => {
    setUndoStack(prev => [...prev, pathPoints]);
    setPathPoints(prevPoints => [...prevPoints, newPoint]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    setRedoStack(prev => [pathPoints, ...prev]);
    setPathPoints(undoStack[undoStack.length - 1]);
    setUndoStack(undoStack.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setUndoStack(prev => [...prev, pathPoints]);
    setPathPoints(redoStack[0]);
    setRedoStack(redoStack.slice(1));
  };

  return { pathPoints, addPoint, undo, redo, undoStack, redoStack };
};
