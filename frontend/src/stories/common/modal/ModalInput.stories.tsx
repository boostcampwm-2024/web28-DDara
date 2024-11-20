import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ModalInput } from '@/component/common/modal/ModalInput';

const meta = {
  title: 'Components/Common/ModalInput',
  component: ModalInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    name: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ModalInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    title: 'ID',
    name: 'id',
    placeholder: '사용할 ID를 입력해주세요.',
    value: '',
  },
};

export const NoTitle: Story = {
  args: {
    title: '',
    name: 'confirmPw',
    placeholder: '비밀번호를 한 번 더 입력해주세요.',
    value: '',
  },
};

export const PrefilledInput: Story = {
  args: {
    title: 'Username',
    name: 'username',
    placeholder: '사용자 이름을 입력해주세요.',
    value: 'JohnDoe',
  },
};

export const EmptyInput: Story = {
  args: {
    title: 'Empty Field',
    name: 'empty',
    placeholder: '이 필드는 비어 있습니다.',
    value: '',
  },
};
