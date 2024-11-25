import { ButtonState } from '@/component/common/enums';
import { useContext, useEffect, useState } from 'react';
import { ToolTypeContext } from '@/context/ToolTypeContext';

export const useFloatingButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { toolType, setToolType } = useContext(ToolTypeContext);

  useEffect(() => {
    setIsMenuOpen(toolType === ButtonState.OPEN);
  }, [toolType]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) {
      setToolType(ButtonState.OPEN);
    } else {
      setToolType(ButtonState.CLOSE);
    }
  };

  const handleMenuClick = (type: ButtonState) => {
    setToolType(type);
    setIsMenuOpen(!isMenuOpen);
  };

  return { isMenuOpen, toolType, toggleMenu, handleMenuClick };
};
