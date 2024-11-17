import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ModalInput } from '@/component/common/modal/ModalInput';
import { fn } from '@storybook/test';

export default {
  title: 'Components/common/modal/ModalInput',
  component: ModalInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof ModalInput>;

const Template: Story = args => <ModalInput {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  title: 'ID',
  name: 'id',
  placeholder: '사용할 ID를 입력해주세요.',
  value: '',
  onChange: fn(),
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  title: '',
  name: 'confirmPw',
  placeholder: '비밀번호를 한 번 더 입력해주세요.',
  value: '',
  onChange: fn(),
};
