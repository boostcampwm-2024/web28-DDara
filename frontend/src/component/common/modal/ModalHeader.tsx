import { MdClear } from 'react-icons/md';
import { Button } from '../button/Button';

interface IModalHeaderProps {
  /** 모달 헤더의 제목 텍스트입니다. */
  content: string;
  /** 모달을 닫는 함수입니다. */
  onClose: () => void;
}

export const ModalHeader = (props: IModalHeaderProps) => (
  <div className="flex flex-row items-start justify-between border-gray-200 py-4">
    <h2 className="h-7 text-lg font-bold leading-7">{props.content}</h2>
    <Button onClick={props.onClose}>
      <MdClear />
    </Button>
  </div>
);
