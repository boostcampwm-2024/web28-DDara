import { describe, test, expect } from 'vitest';

describe('Git CI 에러 방지용 테스트', () => {
  test('테스트코드가 아무것도 없을 때 테스트가 에러나는 것 방지', () => {
    expect(true).toBe(true);
  });
});
