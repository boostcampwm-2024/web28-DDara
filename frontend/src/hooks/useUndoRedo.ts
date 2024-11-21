import { useState } from 'react';

interface IPoint {
  x: number;
  y: number;
}

export const useUndoRedo = (initialPoints: IPoint[]) => {
  const [points, setPoints] = useState<IPoint[]>(initialPoints);
  const [undoStack, setUndoStack] = useState<IPoint[][]>([]);
  const [redoStack, setRedoStack] = useState<IPoint[][]>([]);

  const addPoint = (newPoint: IPoint) => {
    setUndoStack(prev => [...prev, points]);
    setPoints(prevPoints => [...prevPoints, newPoint]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    setRedoStack(prev => [points, ...prev]);
    setPoints(undoStack[undoStack.length - 1]);
    setUndoStack(undoStack.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setUndoStack(prev => [...prev, points]);
    setPoints(redoStack[0]);
    setRedoStack(redoStack.slice(1));
  };

  return { points, addPoint, undo, redo, undoStack, redoStack };
};
