// Airbnb 스타일 가이드를 기반으로 ESLint 설정을 ESM(ECMAScript Module) 방식으로 구성한 파일입니다.
import { FlatCompat } from '@eslint/eslintrc';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbReact from 'eslint-config-airbnb';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
// eslint-disable-next-line import/no-unresolved
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
// eslint-disable-next-line import/no-unresolved
import typescriptParser from '@typescript-eslint/parser';
import storybook from 'eslint-plugin-storybook';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  // 기본 설정: Airbnb JavaScript 규칙과 Prettier, Storybook 설정 포함
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
      'public/',
      '**/*.min.js',
      'docs/',
      'docs/**/*',
      path.join(__dirname, 'eslint.config.mjs'),
      path.join(__dirname, 'frontend', 'vite.config.ts'),
      path.join(__dirname, 'docs', 'docusaurus', 'docusaurus.config.ts'),
    ],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
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

  {
    files: [
      '**/*.stories.*',
      '**/.storybook/**/*.*',
      '**/eslint.config.mjs',
      '**/*.test.{js,ts,tsx}',
      '**/*.spec.{js,ts,tsx}',
      '**/webpack.config.{js,ts}',
      '**/jest.setup.{js,ts}',
      '**/vite.config.{js,ts}',
      '**/*.tsdoc.{js,ts}',
      '**/*.jsdoc.{js,ts}',
      '**/*.vitest.{js,ts}',
      '**/swagger.config.{js,ts}',
      '**/swaggerConfig.{js,ts}',
      '**/*.swagger.{js,ts}',
      '**/*.config.*',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-default-export': 'off',
    },
  },

  // Backend 설정: JavaScript 전용 규칙
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'warn',
      'no-console': 'off',
    },
  },

  // Frontend 설정: React 및 TypeScript 전용 규칙
  // Frontend 설정: React 및 TypeScript 전용 규칙
  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './frontend/tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    ignores: ['docs/**/*'],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(__dirname, 'frontend/tsconfig.eslint.json'),
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
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
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/destructuring-assignment': 'off',
      'react/button-has-type': 'warn',
      'import/no-unresolved': 'error',
      'import/extensions': 'off', // 규칙 비활성화
      'prettier/prettier': 'error',
      'no-underscore-dangle': 'warn',
      'no-undef': 'off',
    },
  },

  // Docusaurus 설정 파일 오버라이드
  {
    files: ['docs/docusaurus/docusaurus.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './docs/docusaurus/tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];
