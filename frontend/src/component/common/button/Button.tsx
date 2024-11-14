import { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: IButtonProps) => {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
