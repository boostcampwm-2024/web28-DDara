import { ButtonState } from '@/component/common/enums';
import { useContext, useEffect, useState } from 'react';
import { ToolTypeContext } from '@/context/ToolTypeContext';

export const useFloatingButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  // const [currentType, setCurrentType] = useState<ButtonState>(ButtonState.CLOSE);
  const { toolType, setToolType } = useContext(ToolTypeContext);

  useEffect(() => {
    // setIsMenuOpen(toolType === ButtonState.OPEN);
    setIsMenuOpen(toolType !== ButtonState.CLOSE);
  }, [toolType]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (isMenuOpen) {
      setToolType(ButtonState.CLOSE);
    } else {
      setToolType(ButtonState.OPEN);
    }
  };

  const handleMenuClick = (type: ButtonState) => {
    setToolType(type);
    setIsMenuOpen(!isMenuOpen);
  };

  return { isMenuOpen, toolType, toggleMenu, handleMenuClick };
};
