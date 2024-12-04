import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/component/common/button/Button.tsx';
import { useContext } from 'react';
import { FooterContext } from '../layout/footer/LayoutFooterProvider';

export const HeaderBackButton = () => {
  const { resetFooterContext } = useContext(FooterContext);
  const navigate = useNavigate();

  const handleHeaderBackButtonClick = () => {
    if (window.history.length > 1) {
      resetFooterContext();
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button onClick={handleHeaderBackButtonClick}>
      <MdArrowBackIos className="text-blueGray-800 h-6 w-6" />
    </Button>
  );
};
