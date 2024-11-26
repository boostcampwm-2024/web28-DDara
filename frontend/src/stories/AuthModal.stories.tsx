import type { Meta, StoryObj } from '@storybook/react';
import { AuthModal, IAuthModalProps } from '@/component/authmodal/AuthModal';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/AuthModal',
  component: AuthModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f3f4f6' }],
    },
  },
  argTypes: {
    isOpen: { control: 'boolean', description: '모달이 열려 있는지 여부를 나타냅니다.' },
    type: {
      control: 'select',
      options: ['login', 'register'],
      description: '모달의 유형을 지정합니다.',
    },
    onClose: { action: 'onClose', description: '모달 닫기 이벤트 핸들러입니다.' },
  },
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<IAuthModalProps>;

export const LoginModal: Story = {
  args: {
    isOpen: true,
    type: 'login',
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '로그인 모달을 렌더링합니다. ID와 비밀번호를 입력받고, "회원가입" 버튼을 통해 회원가입 모달로 전환됩니다.',
      },
    },
  },
};

export const RegisterModal: Story = {
  args: {
    isOpen: true,
    type: 'register',
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '회원가입 모달을 렌더링합니다. ID, 이메일, 이름, 비밀번호를 입력받고, "로그인" 버튼을 통해 로그인 모달로 전환됩니다.',
      },
    },
  },
};
