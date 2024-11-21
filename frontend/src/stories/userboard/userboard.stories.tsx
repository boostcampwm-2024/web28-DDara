import '@/index.css';
import { Meta, StoryFn } from '@storybook/react';
import { UserBoard } from '@/component/userboard/UserBoard';

export default {
  title: 'Components/UserBoard', // Storybook의 사이드바에 표시될 경로
  component: UserBoard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // Storybook 뷰를 중앙에 정렬
  },
  decorators: [
    Story => (
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = args => <UserBoard {...args} />;

export const Default = Template.bind({});
