import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DropdownButton } from '@/component/common/dropdown/DropdownButton.tsx';

import { MdDensityMedium } from 'react-icons/md';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dropdown/Button',
  component: DropdownButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: 'object',
      description: '자식 컴포넌트로 항상 리액트 노드를 넘겨준다.',
      table: {
        type: { summary: 'ReactNode' },
      },
      required: true, // 설명 목적으로 required 여부는 table 필드로 작성함
    },
    className: {
      control: 'text',
      description: '테일 윈드 기반의 클래스 이름을 넘겨준다.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <MdDensityMedium />,
    className: '',
  },
};
