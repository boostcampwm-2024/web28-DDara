import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ModalFooter } from '@/component/common/modal/ModalFooter';

const meta = {
  title: 'Components/Common/ModalFooter',
  component: ModalFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text', description: '첫 번째 버튼의 텍스트를 설정합니다.' },
    onClick: { action: 'clicked', description: '첫 번째 버튼 클릭 이벤트 핸들러입니다.' },
    text2: { control: 'text', description: '두 번째 버튼의 텍스트를 설정합니다.' },
    onClick2: { action: 'clicked', description: '두 번째 버튼 클릭 이벤트 핸들러입니다.' },
  },
  args: {
    onClick: fn(),
    onClick2: fn(),
  },
} satisfies Meta<typeof ModalFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneButton: Story = {
  args: {
    text: '회원가입',
    onClick: fn(),
  },
};

export const TwoButton: Story = {
  args: {
    text: '로그인',
    onClick: fn(),
    text2: '회원가입',
    onClick2: fn(),
  },
};
