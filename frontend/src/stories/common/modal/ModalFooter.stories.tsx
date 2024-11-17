import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ModalFooter } from '@/component/common/modal/ModalFooter';
import { fn } from '@storybook/test';

export default {
  title: 'Components/common/modal/ModalFooter',
  component: ModalFooter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} as Meta<typeof ModalFooter>;

const Template: Story = args => <ModalFooter {...args} />;

export const OneButton = Template.bind({});
OneButton.args = {
  text: '회원가입',
  onClick: fn(),
};

export const TwoButton = Template.bind({});
TwoButton.args = {
  text: '로그인',
  onClick: fn(),
  text2: '회원가입',
  onClick2: fn(),
};
