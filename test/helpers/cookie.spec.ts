import cookie from '../../src/helper/cookie';

describe('helpers:cookie', () => {
  beforeAll(() => {
    document.cookie = 'foo=baz';
  });

  test('should read cookie', () => {
    expect(cookie.read('foo')).toBe('baz');
  });

  test('should return null if cookie name is exist', () => {
    expect(cookie.read('bar')).toBeNull();
  });
});
