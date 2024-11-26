import React from 'react';
import { ModalHeader } from '@/component/common/modal/ModalHeader';
import { ModalInput } from '@/component/common/modal/ModalInput';
import { ModalFooter } from '@/component/common/modal/ModalFooter';

interface IModalProps {
  /** 모달이 열려 있는지 여부를 나타냅니다. */
  isOpen: boolean;
  /** 모달 내에서 렌더링할 자식 요소들입니다. */
  children: React.ReactNode;
}

export const Modal = (props: IModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="z-6000 fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
      <div className="relative w-[22rem] max-w-lg rounded-2xl bg-white px-6 shadow-lg">
        {props.children}
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Input = ModalInput;
