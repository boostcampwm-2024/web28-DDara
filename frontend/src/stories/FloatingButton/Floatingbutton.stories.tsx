import type { Meta, StoryObj } from '@storybook/react';
import { FloatingButton } from '@/component/common/floatingbutton/FloatingButton';
import { ButtonState } from '@/component/common/enums';
import { useFloatingButton } from '@/hooks/useFloatingButton';

const meta = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'FloatingButton은 열기와 닫기 상태를 관리하는 버튼입니다. 상태에 따라 버튼의 텍스트와 기능이 변경됩니다.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f3f4f6' }],
    },
  },
  argTypes: {
    isMenuOpen: {
      control: 'boolean',
      description: '메뉴가 열려 있는지 여부를 나타냅니다.',
    },
    toolType: {
      control: 'select',
      options: Object.values(ButtonState),
      description: '도구 버튼의 상태를 나타냅니다.',
    },
    toggleMenu: {
      action: 'toggleMenu',
      description: '메뉴를 토글하는 함수입니다.',
    },
    handleMenuClick: {
      action: 'handleMenuClick',
      description: '도구를 선택할 수 있는 함수입니다.',
    },
  },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CloseState: Story = {
  args: {
    isMenuOpen: false,
    toolType: ButtonState.CLOSE,
  },
  parameters: {
    docs: {
      description: {
        story:
          '이 버튼은 닫힌 상태를 나타냅니다. 메뉴는 열려 있지 않으며, 버튼은 "열기"로 표시됩니다.',
      },
    },
  },
};

export const OpenState: Story = {
  args: {
    isMenuOpen: true,
    toolType: ButtonState.OPEN,
  },
  parameters: {
    docs: {
      description: {
        story: '이 버튼은 열린 상태를 나타냅니다. 메뉴는 열려 있으며, 버튼은 "닫기"로 표시됩니다.',
      },
    },
  },
};

export const ToggleState: Story = {
  args: {
    isMenuOpen: false,
    toolType: ButtonState.CLOSE,
  },
  render: args => {
    const { isMenuOpen, toggleMenu, handleMenuClick } = useFloatingButton();

    return (
      <FloatingButton
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleMenuClick={handleMenuClick}
        {...args}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '상태를 토글할 수 있는 버튼입니다. 클릭하면 메뉴가 열리고 닫히며 버튼 상태도 변경됩니다.',
      },
    },
  },
};
