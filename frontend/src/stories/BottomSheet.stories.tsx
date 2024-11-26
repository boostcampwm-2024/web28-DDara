import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from '@/component/bottomsheet/BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f3f4f6' }],
    },
  },
  argTypes: {
    minHeight: {
      control: { type: 'range', min: 0.1, max: 1.0, step: 0.1 },
      description: 'Bottom Sheet의 최소 높이 비율을 나타냅니다 (0.0 - 1.0).',
    },
    maxHeight: {
      control: { type: 'range', min: 0.1, max: 1.0, step: 0.1 },
      description: 'Bottom Sheet의 최대 높이 비율을 나타냅니다 (0.0 - 1.0).',
    },
    children: {
      control: false,
      description: 'Bottom Sheet 내부에 렌더링할 콘텐츠입니다.',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSheet: Story = {
  args: {
    minHeight: 0.2,
    maxHeight: 0.8,
    children: (
      <div className="p-4">
        <h2>Default Bottom Sheet</h2>
        <p>This is the content inside the Bottom Sheet.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Bottom Sheet를 렌더링합니다. 최소 높이는 20%, 최대 높이는 80%로 설정됩니다.',
      },
    },
  },
};

export const HalfScreenSheet: Story = {
  args: {
    minHeight: 0.5,
    maxHeight: 1.0,
    children: (
      <div className="p-4">
        <h2>Half Screen Bottom Sheet</h2>
        <p>This Bottom Sheet starts at half the screen height and can expand to full height.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '최소 높이가 50%, 최대 높이가 100%인 Bottom Sheet를 렌더링합니다.',
      },
    },
  },
};

export const SmallSheet: Story = {
  args: {
    minHeight: 0.1,
    maxHeight: 0.3,
    children: (
      <div className="p-4">
        <h2>Small Bottom Sheet</h2>
        <p>This Bottom Sheet starts at 10% of the screen height and expands to 30%.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '작은 Bottom Sheet를 렌더링합니다. 최소 높이는 10%, 최대 높이는 30%로 설정됩니다.',
      },
    },
  },
};
