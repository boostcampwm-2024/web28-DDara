import { ReactNode } from 'react';
import { HeaderDropdown } from '@/component/Layout/header/HeaderDropdown.tsx';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/component/Layout/header/BackButton.tsx';
import { MdArrowBackIos } from 'react-icons/md';

interface IHeaderProps {
  title?: ReactNode;
  subTitle?: ReactNode;
}

export const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // TODO: 뒤로가기이지만, 크게 좋은 방법은 아님, Path거는게 맞으며 라우터에 따라 다시 걸기
    navigate(-1);
  };

  // TODO: h1으로 걸거나, h2로 거는건 어케걸지 생각좀 하기
  return (
    <header className="flex flex-col gap-2.5 p-4">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <BackButton onClick={handleButtonClick}>
            <MdArrowBackIos className="h-6 w-6" />
          </BackButton>
          {props.title}
        </div>
        <HeaderDropdown />
      </div>
      <div>{props.subTitle}</div>
    </header>
  );
};
