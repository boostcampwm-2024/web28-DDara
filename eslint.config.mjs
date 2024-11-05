// Airbnb 스타일 가이드를 기반으로 ESLint 설정을 ESM(ECMAScript Module) 방식으로 구성한 파일입니다.
import { FlatCompat } from '@eslint/eslintrc';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbReact from 'eslint-config-airbnb';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import path from 'path';
import { fileURLToPath } from 'url';

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

  {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    ignores: [
      'node_modules/',
      'dist/',
      path.join(__dirname, 'eslint.config.mjs'), // 절대 경로로 무시
      path.join(__dirname, 'FrontEnd', 'vite.config.ts'), // 추가로 무시할 파일이 있으면 동일하게 추가
    ],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, packageDir: __dirname },
      ],
      'import/prefer-default-export': 'off',
      'prettier/prettier': 'error',
      'no-underscore-dangle': 'warn',
    },
  },

  // 2. BackEnd 설정 - JavaScript 전용 규칙 적용
  {
    files: ['BackEnd/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // 3. FrontEnd 설정 - React 및 TypeScript 전용 규칙 적용
  {
    files: ['FrontEnd/**/*.ts', 'FrontEnd/**/*.tsx'],
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
      'import/no-default-export': 'warn',
      'no-undef': 'off',
    },
  },
];
