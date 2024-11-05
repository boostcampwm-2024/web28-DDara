// eslint.config.mjs

// Airbnb 스타일 가이드를 기반으로 ESLint 설정을 ESM(ECMAScript Module) 방식으로 구성한 파일입니다.
// FlatCompat은 기존 `.eslintrc` 형식을 새로운 flat config 방식과 호환시켜주는 유틸리티입니다.
import { FlatCompat } from '@eslint/eslintrc';
import airbnbBase from 'eslint-config-airbnb-base'; // JavaScript용 Airbnb 스타일 가이드 규칙
import airbnbReact from 'eslint-config-airbnb'; // React를 포함한 Airbnb 스타일 가이드 규칙
import importPlugin from 'eslint-plugin-import'; // import 관련 규칙을 제공하는 플러그인
import reactPlugin from 'eslint-plugin-react'; // React 관련 규칙을 제공하는 플러그인
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'; // 접근성 검사 규칙을 제공하는 플러그인 (ARIA 등)
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier와 ESLint를 통합하는 플러그인
import prettierConfig from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin'; // TypeScript 관련 규칙을 제공하는 플러그인
import typescriptParser from '@typescript-eslint/parser'; // TypeScript 파서를 설정하여 ESLint에서 TS 구문을 해석 가능하게 함
import path from 'path';
import { fileURLToPath } from 'url';

// ESM에서는 __dirname과 __filename이 기본으로 제공되지 않으므로, import.meta.url을 사용하여 현재 파일의 경로를 정의합니다.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// FlatCompat을 사용하여 기존 ESLint 설정을 flat config 방식으로 변환합니다.
// baseDirectory와 resolvePluginsRelativeTo 옵션을 통해 설정 파일의 위치를 기준으로 경로를 해석합니다.
const compat = new FlatCompat({
  baseDirectory: __dirname, // 설정 파일의 기준 디렉토리를 현재 파일의 디렉토리로 설정
  resolvePluginsRelativeTo: __dirname, // 플러그인을 현재 디렉토리 기준으로 해석
});

export default [
  // 1. Airbnb JavaScript 기본 규칙을 BackEnd와 FrontEnd 공통으로 적용합니다.
  // Airbnb 스타일 가이드를 통해 코드의 일관성과 가독성을 유지하도록 합니다.
  // `compat.config()`를 통해 기존 eslint-config-airbnb-base 설정을 flat config와 호환시킵니다.
  ...compat.config(airbnbBase),
  ...compat.config(airbnbReact),
  ...compat.config(prettierConfig), // Prettier와의 충돌 방지 설정 추가
  {
    plugins: {
      import: importPlugin, // ES6 import 구문 관련 규칙을 사용하기 위한 import 플러그인
      prettier: prettierPlugin, // Prettier와 ESLint를 통합하여 코드 포맷을 일관되게 유지
    },
    rules: {
      'import/prefer-default-export': 'off', // 파일에 단일 export가 있을 때 default export 강제를 비활성화
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 에러로 표시
    },
  },

  // 2. BackEnd (JavaScript 전용) 설정
  // BackEnd 디렉토리는 JS만 사용하므로 TypeScript와 React 관련 규칙을 적용하지 않습니다.
  {
    files: ['BackEnd/**/*.js'], // BackEnd 디렉토리의 모든 .js 파일에만 적용
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 문법을 사용할 수 있도록 설정 (ES2021+)
      sourceType: 'module', // ES 모듈 방식으로 구문 분석 (import/export 사용 가능)
    },
    plugins: {
      import: importPlugin, // ES6 import 구문 관련 규칙을 사용하기 위한 import 플러그인
      prettier: prettierPlugin, // Prettier와 ESLint를 통합하여 코드 포맷을 일관되게 유지
    },
  },

  // 3. FrontEnd (React와 TypeScript 전용) 설정
  // FrontEnd 디렉토리의 .ts, .tsx 파일에만 TypeScript와 React 관련 규칙을 적용합니다.
  {
    files: ['FrontEnd/**/*.ts', 'FrontEnd/**/*.tsx'], // FrontEnd 디렉토리 내 .ts와 .tsx 파일에만 적용
    languageOptions: {
      parser: typescriptParser, // TypeScript 파서를 설정하여 TS 구문을 지원
      ecmaVersion: 'latest', // 최신 ECMAScript 버전을 지원
      sourceType: 'module', // ES 모듈 방식을 지원 (import/export 사용 가능)
    },
    plugins: {
      import: importPlugin, // import 구문 관련 규칙을 제공
      react: reactPlugin, // React 관련 규칙을 제공
      'jsx-a11y': jsxA11yPlugin, // 접근성 검사(ARIA 속성 등)를 제공하는 플러그인
      prettier: prettierPlugin, // Prettier와 ESLint를 통합하여 코드 스타일을 일관되게 유지
      '@typescript-eslint': typescriptPlugin, // TypeScript 관련 규칙을 제공
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지하여 적절한 규칙을 적용 (React 17+ 이상에서 최적화)
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
          args: 'all', // 모든 함수 인자에 적용
          argsIgnorePattern: '^_', // 변수명이 _로 시작하면 예외로 허용
          destructuredArrayIgnorePattern: '^_', // 구조분해 할당한 배열도 예외로 허용
        },
      ],

      // 규칙 3: type 대신 interface를 사용하며, 인터페이스 이름에 접두사 'I'를 붙입니다.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // type 대신 interface 사용 강제
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface', // interface에만 적용
          format: ['PascalCase'], // PascalCase 형식을 강제
          custom: {
            regex: '^I[A-Z]', // I로 시작하는 이름만 허용
            match: true,
          },
        },
      ],

      // React와 관련된 추가 규칙 설정
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }], // JSX 파일 확장자 제한
      'react/prop-types': 'off', // prop-types를 사용하지 않음 (TypeScript 사용 시 유용)
      'jsx-a11y/anchor-is-valid': 'warn', // 유효한 anchor 태그 사용 경고 (접근성)
      'react/react-in-jsx-scope': 'off', // React 17 이상에서는 import React 생략 가능
      'import/no-default-export': 'error', // 모든 파일에 대해 default export를 금지
    },
  },
];
