import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/component/common/button/Button.tsx';

export const HeaderBackButton = () => {
  const navigate = useNavigate();

  const handleHeaderBackButtonClick = () => {
    if (window.history.length > 1) {
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
