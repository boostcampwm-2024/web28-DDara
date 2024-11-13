import type { Preview } from '@storybook/react';
import '../src/index.css';
// 우선은 폰트 다 포함시켰는데, 나중에 사용할 것들만 따로 뺴자.
import '@fontsource/pretendard/100.css';
import '@fontsource/pretendard/200.css';
import '@fontsource/pretendard/300.css';
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';
import '@fontsource/pretendard/800.css';
import '@fontsource/pretendard/900.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
