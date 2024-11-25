import { ButtonState } from '@/component/common/enums';
import { useState } from 'react';

export const useFloatingButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [toolType, setToolType] = useState<ButtonState>(ButtonState.OPEN);

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
