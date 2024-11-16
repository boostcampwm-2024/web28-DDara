import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useModal } from '@/hooks/useModal';
import { AuthModal } from '@/component/authmodal/AuthModal';

export default {
  title: 'Components/AuthModal',
  component: AuthModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof AuthModal>;

const LoginModalTemplate: Story = args => {
  const { onClose } = useModal();

  return <AuthModal {...args} onClose={onClose} />;
};

const RegisterModalTemplate: Story = args => {
  const { onClose } = useModal();

  return <AuthModal {...args} onClose={onClose} />;
};

export const LoginModal = LoginModalTemplate.bind({});
LoginModal.args = {
  isOpen: true,
  type: 'login',
};
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
RegisterModal.args = {
  isOpen: true,
  type: 'register',
};
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
