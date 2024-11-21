import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from '@/component/common/dropdown/DropdownMenu.tsx';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { MdLocationOn } from 'react-icons/md';
import { ToggleContext } from '@/component/common/dropdown/DropdownContext.tsx';
import classNames from 'classnames';

const meta = {
  title: 'Components/Common/Dropdown/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ToggleContext.Provider
        value={{
          isOpen: true,
          toggle: () => {},
        }}
      >
        <div
          style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </div>
      </ToggleContext.Provider>
    ),
  ],
  argTypes: {
    // 'children'에 대한 컨트롤 비활성화
    children: {
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: ['사용자 1', '사용자 2', '사용자 3', '사용자 4', '사용자 5'].map((e, i) => {
      const textMarkerUser = [
        'text-marker-user1',
        'text-marker-user2',
        'text-marker-user3',
        'text-marker-user4',
        'text-marker-user5',
      ];

      return (
        <DropdownItem key={e}>
          {e}
          <MdLocationOn className={classNames(`h-5 w-5 fill-current ${textMarkerUser[i]}`)} />
          {/* 아이콘 색 변경 로직 찾기, 현재는 아이콘색이 반영이 안됨 수정할 사 */}
        </DropdownItem>
      );
    }),
  },
};

export const Secondary: Story = {
  args: {
    children: ['사용자 1', '사용자 2'].map((e, i) => {
      const textMarkerUser = [
        'text-marker-user1',
        'text-marker-user2',
        'text-marker-user3',
        'text-marker-user4',
        'text-marker-user5',
      ];

      return (
        <DropdownItem key={e}>
          {e}
          <MdLocationOn className={classNames(`h-5 w-5 fill-current ${textMarkerUser[i]}`)} />
          {/* 아이콘 색 변경 로직 찾기, 현재는 아이콘색이 반영이 안됨 수정할 사 */}
        </DropdownItem>
      );
    }),
  },
};
