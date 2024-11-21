import type { Meta, StoryObj } from '@storybook/react';

import { DropdownTrigger } from '@/component/common/dropdown/DropdownTrigger.tsx';
import { ToggleProvider } from '@/component/common/dropdown/DropdownContext.tsx';
import { MdMenu, MdMoreVert } from 'react-icons/md';

const meta = {
  title: 'Components/Common/Dropdown/DropdownTrigger',
  component: DropdownTrigger,
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
  args: {},
} satisfies Meta<typeof DropdownTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuButton: Story = {
  args: {
    // 'children'에 React 엘리먼트를 직접 전달
    children: <MdMenu className="h-6 w-6" />,
  },
};

export const DotButton: Story = {
  args: {
    // 'children'에 React 엘리먼트를 직접 전달
    children: <MdMoreVert className="h-6 w-6" />,
  },
};
