import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// 이 파일은 Node.js에서 실행됩니다 - 여기에서는 클라이언트 사이드 코드(브라우저 API, JSX 등)를 사용하지 마세요.

const config: Config = {
  // 사이트 제목 설정
  title: 'DDara',
  // 사이트 태그라인 설정
  tagline: '중장년층 사용자가 쉽게 길 안내를 받게 해주는 모바일 웹서비스',
  // 파비콘 설정
  favicon: 'img/favicon.ico',

  // 사이트의 프로덕션 URL을 설정하세요.
  url: 'https://ddara-docs.vercel.app/', // URL은 변경하지 않음
  // 사이트가 제공되는 /<baseUrl>/ 경로명을 설정하세요.
  baseUrl: '/',

  // GitHub 페이지 배포 구성.
  // GitHub 페이지를 사용하지 않는다면, 이 설정은 필요 없습니다.
  organizationName: 'boostcampwm-2024', // 일반적으로 GitHub 조직/사용자 이름입니다.
  projectName: 'web28-DDara', // 일반적으로 저장소 이름입니다.

  // 깨진 링크에 대한 동작 설정
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // 국제화를 사용하지 않더라도, 이 필드를 통해 유용한 메타데이터를 설정할 수 있습니다.
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  // 프리셋 설정
  presets: [
    [
      'classic',
      {
        docs: false, // 플러그인에서 문서를 관리하므로 false로 설정
        blog: false, // 플러그인에서 블로그를 관리하므로 false로 설정
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // 플러그인 설정
  plugins: [
    // 'about' 문서 플러그인
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'about',
        path: './docs/about',
        routeBasePath: 'about',
        sidebarPath: './sidebars/about_sidebars.ts',
        editUrl: 'https://github.com/boostcampwm-2024/web28-DDara/tree/main/blog/docusaurus/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
        sidebarCollapsible: true,
        sidebarCollapsed: true,
      },
    ],
    // 'wiki' 문서 플러그인
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'wiki',
        path: './docs/wiki',
        routeBasePath: 'wiki',
        sidebarPath: './sidebars/wiki_sidebars.ts',
        editUrl: 'https://github.com/boostcampwm-2024/web28-DDara/tree/main/blog/docusaurus/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
        sidebarCollapsible: true,
        sidebarCollapsed: true,
      },
    ],
    // 'dev_log' 블로그 플러그인
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'dev_log',
        path: 'dev_log',
        routeBasePath: 'dev_log',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.com/boostcampwm-2024/web28-DDara/tree/main/blog/docusaurus/',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
        blogSidebarTitle: '모든 글',
        blogSidebarCount: 'ALL',
      },
    ],
    // 'archive' 문서 플러그인
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'archive',
        path: './docs/archive',
        routeBasePath: 'archive',
        sidebarPath: './sidebars/archive_sidebars.ts',
        editUrl: 'https://github.com/boostcampwm-2024/web28-DDara/tree/main/blog/docusaurus/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
        sidebarCollapsible: true,
        sidebarCollapsed: true,
      },
    ],
    // 'study' 문서 플러그인
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'study',
        path: './docs/study',
        routeBasePath: 'study',
        sidebarPath: './sidebars/study_sidebars.ts',
        editUrl: 'https://github.com/boostcampwm-2024/web28-DDara/tree/main/blog/docusaurus/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
        sidebarCollapsible: true,
        sidebarCollapsed: true,
      },
    ],
    // 기타 플러그인
    '@docusaurus/theme-live-codeblock',
  ],

  // 테마 구성
  themeConfig: {
    // 사이트의 기본 Open Graph 및 Twitter 카드 이미지를 설정합니다.
    // image: 'img/social-card.jpg', // 이미지가 없으므로 주석 처리 또는 삭제

    docs: {
      sidebar: {
        hideable: true,
      },
    },

    navbar: {
      title: 'DDara',
      logo: {
        alt: '사이트 로고',
        src: 'img/logo.webp',
      },
      items: [
        {
          type: 'doc',
          docId: 'about_members',
          position: 'left',
          label: '🧑‍💻 About',
          docsPluginId: 'about',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '📚 Wiki',
          docsPluginId: 'wiki',
        },
        {
          to: '/dev_log',
          label: '🚀 Dev Log',
          position: 'left',
          activeBasePath: 'dev_log',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '📝 Archive',
          docsPluginId: 'archive',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '📙 Study',
          docsPluginId: 'study',
        },
        {
          href: 'https://github.com/boostcampwm-2024/web28-DDara',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '📝 About',
              to: '/docs/about/',
            },
            {
              label: '📝 Wiki',
              to: '/docs/wiki/',
            },
            {
              label: '📝 archive',
              to: '/docs/archive/',
            },
            {
              label: '📝 Study',
              to: '/docs/study/',
            },
          ],
        },
        {
          title: 'Repository',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/boostcampwm-2024/web28-DDara',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '🚀 Dev Log',
              to: '/dev_log',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/boostcampwm-2024/web28-DDara',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} web28. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    liveCodeBlock: {
      /**
       * 라이브 플레이그라운드의 위치를 지정합니다. 에디터 위나 아래에 배치할 수 있습니다.
       * 가능한 값: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
    // SEO 및 링크 미리보기를 위한 메타데이터 설정
    metadata: [
      {name: 'author', content: 'Zen'},
      { name: 'keywords', content: '프론트엔드 개발, 동기화, Zen, 블로그, 프로그래밍' },
      {name: 'twitter:card', content: 'summary_large_image'},
      // 전역 타이틀 및 설명을 설정하되, 개별 페이지에서 덮어쓸 수 있도록 합니다.
      {name: 'twitter:url', content: 'https://ddara-docs.vercel.app'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'https://ddara-docs.vercel.app'},
    ],
  } satisfies Preset.ThemeConfig,

  // 추가 테마 설정
  themes: ['@docusaurus/theme-mermaid'],
  // Markdown에서 Mermaid 코드 블록을 사용하려면,
  // 이 옵션으로 Remark 플러그인을 활성화해야 합니다.
  markdown: {
    mermaid: true,
  },
  // 플러그인 설정 (이미 위에서 설정됨)

  // head 태그 설정
  headTags: [
    // 필요한 경우 추가적인 head 태그를 여기에 포함할 수 있습니다.
  ]
};

export default config;
