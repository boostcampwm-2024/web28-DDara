import { ButtonState } from '@/component/common/enums';
import { createContext, ReactNode, useMemo, useState } from 'react';

interface IToolContextType {
  toolType: ButtonState;
  setToolType: (toolType: ButtonState) => void;
}
interface IToolTypeProps {
  children: ReactNode; // ReactNode 타입 추가
}

const defaultToolContext: IToolContextType = {
  toolType: ButtonState.CLOSE,
  setToolType: () => {},
};

export const ToolTypeContext = createContext<IToolContextType>(defaultToolContext);

export const ToolTypeProvider = (props: IToolTypeProps) => {
  const [toolType, setToolType] = useState<ButtonState>(ButtonState.CLOSE);
  const contextValue = useMemo(() => ({ toolType, setToolType }), [toolType, setToolType]);

  return <ToolTypeContext.Provider value={contextValue}>{props.children}</ToolTypeContext.Provider>;
};
