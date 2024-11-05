// prettier.config.mjs
export default {
  // 문자열은 작은따옴표를 사용합니다. (Airbnb에서도 권장)
  singleQuote: true,

  // 여러 줄 객체나 배열에서 마지막 요소 뒤에 콤마를 추가합니다.
  // Airbnb에서는 모든 경우에 trailing commas를 허용합니다.
  trailingComma: 'all',

  // JSX에서는 큰따옴표를 사용하도록 설정합니다. (Airbnb 가이드에서 따름)
  jsxSingleQuote: false,

  // 탭이 아닌 스페이스로 들여쓰기를 하고, 들여쓰기 폭은 2로 설정합니다. (Airbnb 권장사항)
  useTabs: false,
  tabWidth: 2,

  // 한 줄의 최대 길이를 100자로 설정합니다. (Airbnb 스타일 가이드는 기본적으로 100자 권장)
  printWidth: 100,

  // 중괄호 내에서 공백을 추가하지 않습니다.
  // ex) { foo: 'bar' }
  bracketSpacing: true,

  // 여러 줄 JSX 요소가 있을 때 닫는 꺽쇠가 새 줄에 오도록 설정합니다.
  // ex)
  // <MyComponent
  //   foo="bar"
  //   baz="qux"
  // />
  bracketSameLine: false,

  // 화살표 함수의 매개변수가 하나일 경우 괄호를 생략합니다.
  // ex) x => x + 1
  arrowParens: 'avoid',

  // 파일의 끝에 자동으로 줄바꿈을 추가합니다.
  endOfLine: 'lf',

  // HTML 파일, JSX, Vue 파일에서는 줄 바꿈을 그대로 유지합니다.
  htmlWhitespaceSensitivity: 'css',

  // 최종 줄 바꿈을 추가하여 POSIX 호환성을 유지합니다.
  // 모든 파일의 끝에 빈 줄을 추가합니다.
  insertFinalNewline: true,

  // Markdown과 같은 파일에서 wrapping을 허용하지 않습니다.
  // 이는 README 등의 문서에 적용되며, 가독성을 높입니다.
  proseWrap: 'always',

  // Vue 파일의 들여쓰기를 설정합니다.
  vueIndentScriptAndStyle: false,

  // 객체 속성 선언 시에도 공백을 허용하지 않는다.
  spaceBeforeFunctionParen: false,

  // 코멘트 사이에 공백을 추가합니다.
  commentSpacing: true,

  // 줄 바꿈 후의 들여쓰기 수준을 유지합니다.
  maintainIndent: true,

  // 모든 줄 끝에 빈 줄을 추가하여 가독성을 유지합니다.
  insertEmptyFinalNewline: true,

  // JSON에서는 두 개의 스페이스를 사용하여 들여쓰기를 맞춥니다.
  jsonIndent: 2,
};
