import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/component/common/modal/Modal';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f3f4f6' }],
    },
  },
  argTypes: {
    isOpen: { control: 'boolean', description: '모달이 열려 있는지 여부를 나타냅니다.' },
    children: { control: false, description: '모달 내부에 렌더링할 콘텐츠입니다.' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicModal: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <Modal.Header content="Basic Modal" onClose={fn()} />
        <Modal.Input
          title="Password"
          name="password"
          placeholder="Enter your password"
          value=""
          onChange={fn()}
        />
        <Modal.Footer text="Confirm" onClick={fn()} text2="Cancel" onClick2={fn()} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 모달 컴포넌트를 렌더링합니다.',
      },
    },
  },
};

export const LoginModal: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <Modal.Header content="Log In" onClose={fn()} />
        <Modal.Input title="ID" name="id" placeholder="Enter your ID" value="" onChange={fn()} />
        <Modal.Input
          title="Password"
          name="password"
          placeholder="Enter your password"
          value=""
          onChange={fn()}
        />
        <Modal.Footer text="Log In" onClick={fn()} text2="Sign Up" onClick2={fn()} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '로그인 모달 컴포넌트를 렌더링합니다.',
      },
    },
  },
};

export const RegisterModal: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <Modal.Header content="Register" onClose={fn()} />
        <Modal.Input
          title="Password"
          name="password"
          placeholder="Enter your password"
          value=""
          onChange={fn()}
        />
        <Modal.Footer text="Register" onClick={fn()} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '회원가입 모달 컴포넌트를 렌더링합니다.',
      },
    },
  },
};
