import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BottomSheet } from '@/component/BottomSheet/BottomSheet';
import { Content } from '@/component/BottomSheet/Content';

export default {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof BottomSheet>;

const contentData = [
  {
    id: '1',
    title: '아들네 집으로',
    time: '0시간 30분',
    person: '2명',
    link: '/a',
  },
  {
    id: '2',
    title: '친구네 집으로',
    time: '0시간 45분',
    link: '/b',
  },
  {
    id: '3',
    title: '회사로',
    time: '1시간 10분',
    person: '1명',
    link: '/c',
  },
];

const ExampleContent = (
  <>
    <div className="flex items-center justify-center pb-1 pt-2">
      <div className="h-1.5 w-12 rounded-full bg-gray-300" />
    </div>

    {contentData.map(item => (
      <Content
        key={item.id}
        title={item.title}
        time={item.time}
        person={item.person}
        link={item.link}
      />
    ))}
  </>
);

const Template: Story<typeof BottomSheet> = args => <BottomSheet {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: ExampleContent,
};
Default.parameters = {
  docs: {
    description: {
      story:
        '기본적인 BottomSheet 컴포넌트를 렌더링하고, Content 컴포넌트를 children으로 전달합니다.',
    },
  },
  backgrounds: {
    default: 'gray',
    values: [{ name: 'gray', value: '#f3f4f6' }],
  },
};
