import React, { Fragment } from 'react';
import { Meta, Story } from '@storybook/react';
import { BottomSheet } from '@/component/bottomSheet/BottomSheet';
import { Content } from '@/component/content/Content';

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
    person: 2,
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
    person: 1,
    link: '/c',
  },
];

const ExampleContent = (
  <>
    {contentData.map(item => (
      <Fragment key={item.id}>
        <Content title={item.title} time={item.time} person={item.person} link={item.link} />
        <hr />
      </Fragment>
    ))}
  </>
);

const Template: Story<typeof BottomSheet> = args => <BottomSheet {...args} />;

export const Default = Template.bind({});
Default.args = {
  minHeight: 0.5,
  maxHeight: 0.85,
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
