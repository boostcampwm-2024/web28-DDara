import { ReactNode } from 'react';

interface IBackButtonProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// TODO: 이렇게 쓸 거면 범용 버튼으로 빼도...?
export const BackButton = (props: IBackButtonProps) => {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
