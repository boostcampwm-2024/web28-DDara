// Airbnb 스타일 가이드를 기반으로 ESLint 설정을 ESM(ECMAScript Module) 방식으로 구성한 파일입니다.
import { FlatCompat } from "@eslint/eslintrc";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbReact from "eslint-config-airbnb";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
// eslint-disable-next-line import/no-unresolved
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
// eslint-disable-next-line import/no-unresolved
import typescriptParser from "@typescript-eslint/parser";
import storybook from "eslint-plugin-storybook";
import path from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  // 1. 기본 설정 - Airbnb JavaScript 규칙과 Prettier를 포함한 공통 설정을 적용합니다.
  ...compat.config(airbnbBase),
  ...compat.config(airbnbReact),
  ...compat.config(prettierConfig),
  ...storybook.configs['flat/recommended'],

  {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    ignores: [
      'node_modules/',
      'dist/',
      'public/', // public 폴더 제외
      '**/*.min.js', // 모든 .min.js 파일 제외
      path.join(__dirname, 'eslint.config.mjs'), // 절대 경로로 무시
      path.join(__dirname, 'frontend', 'vite.config.ts'), // 추가로 무시할 파일이 있으면 동일하게 추가
    ],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        "packageDir": ["./", "./backend", "./frontend"]
      }],
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'warn',
      'prettier/prettier': 'error',
      'no-underscore-dangle': 'warn',
      'no-undef': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  // 2. backend 설정 - JavaScript 전용 규칙 적용
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // 3. frontend 설정 - React 및 TypeScript 전용 규칙 적용
  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // 규칙 1: 화살표 함수로 컴포넌트 정의를 강제하며, default export를 금지합니다.
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],

      // 규칙 2: props 인자로 구조분해 할당을 사용하지 않음
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // 규칙 3: type 대신 interface를 사용하며, 인터페이스 이름에 접두사 'I'를 붙입니다.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      // React와 관련된 추가 규칙 설정
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },

  {
    files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}'],
    rules: {
      'no-console': 'off', // 테스트 파일에서는 console 사용 허용
    },
  },

  {
    files: [
      '**/*.stories.*', // 모든 스토리 파일
      '**/.storybook/**/*.*', // .storybook 폴더 내 모든 파일
      '**/eslint.config.mjs', // eslint 설정 파일
      '**/*.test.{js,ts,tsx}', // 테스트 파일
      '**/*.spec.{js,ts,tsx}', // 스펙 파일
      '**/webpack.config.{js,ts}', // Webpack 설정 파일
      '**/jest.setup.{js,ts}', // Jest 설정 파일
      '**/vite.config.{js,ts}', // Vite 설정 파일
      '**/*.tsdoc.{js,ts}', // TSDoc 관련 파일
      '**/*.jsdoc.{js,ts}', // JSDoc 관련 파일
      '**/*.vitest.{js,ts}', // Vitest 관련 파일
      '**/swagger.config.{js,ts}', // Swagger 설정 파일
      '**/*.swagger.{js,ts}', // Swagger 관련 파일
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off', // 해당 파일에서 규칙 비활성화
    },
  },
];
