// Dropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdLocationOn, MdMenu } from 'react-icons/md';
import classNames from 'classnames';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Common/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen', // 중앙 정렬 레이아웃
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // 'children'에 대한 컨트롤 비활성화
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const textMarkerUser = [
  'text-marker-user1',
  'text-marker-user2',
  'text-marker-user3',
  'text-marker-user4',
  'text-marker-user5',
];

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <MdMenu className="h-6 w-6" />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {['사용자 1', '사용자 2', '사용자 3', '사용자 4', '사용자 5'].map((e, i) => {
          return (
            <DropdownItem key={e}>
              {e}
              <MdLocationOn className={classNames(`h-5 w-5 fill-current ${textMarkerUser[i]}`)} />
              {/* 아이콘 색 변경 로직 찾기, 현재는 아이콘색이 반영이 안됨 수정할 사 */}
            </DropdownItem>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  ),
};
