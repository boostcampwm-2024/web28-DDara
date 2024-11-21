import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ModalHeader } from '@/component/common/modal/ModalHeader';

const meta = {
  title: 'Components/Common/ModalHeader',
  component: ModalHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: { control: 'text', description: '헤더의 텍스트를 설정합니다.' },
    onClose: { action: 'closed', description: '닫기 버튼 클릭 이벤트 핸들러입니다.' },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    content: 'Login',
  },
};

export const LongHeader: Story = {
  args: {
    content: 'This is a long header title that demonstrates text wrapping in the modal header.',
  },
};

export const EmptyHeader: Story = {
  args: {
    content: '',
  },
};
