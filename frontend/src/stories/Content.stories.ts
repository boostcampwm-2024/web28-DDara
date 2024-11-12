import type { Meta, StoryObj } from '@storybook/react';
import { Content } from '@/component/BottomSheet/Content';

const meta = {
  title: 'Components/Content',
  component: Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'channel의 제목을 나타낸다.' },
    time: { control: 'text', description: '출발지부터 목적지까지 소요시간을 나타낸다.' },
    person: { control: 'text', description: 'channel에 접속한 인원 수를 나타냅니다.' },
  },
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '아들네 집으로',
    time: '0시간 30분',
    person: '2명',
  },
};

export const NoPerson: Story = {
  args: {
    title: '친구 집 방문',
    time: '1시간 20분',
    person: '',
  },
};

export const LongText: Story = {
  args: {
    title: '대한민국 경기도 성남시 분당구 네이버 본사까지 가는 경로 안내 채널',
    time: '2시간 45분',
    person: '4명',
  },
};
