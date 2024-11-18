import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { ToggleProvider } from '@/component/common/dropdown/DropdownContext.tsx';
import { MdLocationOn } from 'react-icons/md';
import classNames from 'classnames';

const meta = {
  title: 'Components/Common/Dropdown/DropdownItem',
  component: DropdownItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ToggleProvider>
        <Story />
      </ToggleProvider>
    ),
  ],
  argTypes: {
    // 'children'에 대한 컨트롤 비활성화
    children: { control: false },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof DropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        사용자 1<MdLocationOn className={classNames(`text-marker-user1 h-5 w-5 fill-current`)} />
      </>
    ),
  },
};
