import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/component/common/button/Button.tsx';
import { useContext } from 'react';
import { FooterContext } from '../layout/footer/LayoutFooterProvider';
import { HeaderContext } from '../layout/header/LayoutHeaderProvider';

export const HeaderBackButton = () => {
  const { resetFooterContext } = useContext(FooterContext);
  const { resetHeaderContext } = useContext(HeaderContext);
  const navigate = useNavigate();

  const handleHeaderBackButtonClick = () => {
    if (window.history.length > 1) {
      resetFooterContext();
      resetHeaderContext();
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button onClick={handleHeaderBackButtonClick}>
      <MdArrowBackIos className="h-6 w-6" />
    </Button>
  );
};