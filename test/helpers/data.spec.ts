import { requestDataFormat, responseDataFormat } from '../../src/helper/data';

describe('helpers:data', () => {
  describe('requestDataFormat', () => {
    test('能否转换为字符串', () => {
      const a = { a: 12 };
      expect(requestDataFormat(a)).toBe('{"a":12}');
    });

    test('转换一个不是普通Object,什么都不做', () => {
      const a = [4, 1, 4];
      expect(requestDataFormat(a)).toBe(a);
    });
  });

  describe('responseDataFormat', () => {
    test('字符串转为对象', () => {
      const a = { a: 12 };
      const b = JSON.stringify(a);
      expect(responseDataFormat(b)).toStrictEqual(a);
    });

    test('如果是string,但不是 JSON string,什么都不做', () => {
      const a = new Date();
      expect(responseDataFormat(a)).toBe(a);
    });

    test('如果不是string,什么都不做', () => {
      const a = { a: 12 };
      expect(responseDataFormat(a)).toBe(a);
    });
  });
});
