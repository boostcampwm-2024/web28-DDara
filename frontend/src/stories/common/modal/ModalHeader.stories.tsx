import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ModalHeader } from '@/component/common/modal/ModalHeader';
import { fn } from '@storybook/test';

export default {
  title: 'Components/common/modal/ModalHeader',
  component: ModalHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ModalHeader>;

const Template: Story = args => <ModalHeader {...args} />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  content: 'Login',
  onClose: fn(),
};
