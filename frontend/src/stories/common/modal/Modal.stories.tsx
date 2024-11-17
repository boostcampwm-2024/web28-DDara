import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Modal } from '@/component/common/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { fn } from '@storybook/test';

export default {
  title: 'Components/common/modal/Modal',
  component: Modal,
  tags: ['autodocs'],
} as Meta<typeof Modal>;

const LoginModalTemplate: Story = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={onOpen}
        type="button"
      >
        로그인
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header content="Log In" onClose={onClose} />
        <Modal.Input title="ID" placeholder="ID" />
        <Modal.Input title="PW" placeholder="PW" />
        <Modal.Footer text="로그인" onClick={fn()} text2="회원가입" onClick2={fn()} />
      </Modal>
    </div>
  );
};

const RegisterModalTemplate: Story = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={onOpen}
        type="button"
      >
        회원가입
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header content="Register" onClose={onClose} />
        <Modal.Input title="ID" placeholder="사용할 ID를 입력해주세요." />
        <Modal.Input title="Email" placeholder="Email 주소를 입력해주세요." />
        <Modal.Input title="Name" placeholder="이름을 입력해주세요." />
        <Modal.Input title="PW" placeholder="사용할 비밀번호를 입력해주세요." />
        <Modal.Input title="" placeholder="비밀번호를 한 번 더 입력해주세요." />
        <Modal.Footer text="회원가입" onClick={fn()} />
      </Modal>
    </div>
  );
};

export const LoginModal = LoginModalTemplate.bind({});
LoginModal.parameters = {
  docs: {
    description: {
      story: '로그인 모달 컴포넌트를 렌더링합니다.',
    },
  },
  backgrounds: {
    default: 'gray',
    values: [{ name: 'gray', value: '#f3f4f6' }],
  },
};

export const RegisterModal = RegisterModalTemplate.bind({});
RegisterModal.parameters = {
  docs: {
    description: {
      story: '회원가입 모달 컴포넌트를 렌더링합니다.',
    },
  },
  backgrounds: {
    default: 'gray',
    values: [{ name: 'gray', value: '#f3f4f6' }],
  },
};
