import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  isUndefined,
  isArray,
  isObject,
  merge,
} from '../../src/utils/utils';

describe('utils', () => {
  // 测试断言
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy();
      expect(isDate(Date.now())).toBeFalsy();
    });

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy();
      expect(isPlainObject(new Date())).toBeFalsy();
      expect(isPlainObject([])).toBeFalsy();
    });

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy();
      expect(isFormData({})).toBeFalsy();
    });

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy();
    });

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy();
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy();
    });

    test('should validata Undefined', () => {
      expect(isUndefined(null)).toBeFalsy();
      expect(isUndefined(undefined)).toBeTruthy();
    });

    test('should validata Array', () => {
      expect(isArray({})).toBeFalsy();
      expect(isArray([])).toBeTruthy();
      expect(isArray(new Array(5))).toBeTruthy();
      expect(isArray(document.querySelectorAll('div'))).toBeFalsy();
    });

    test('should validata Object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeTruthy();
      expect(isObject(new Array(5))).toBeTruthy();
    });
  });

  describe('merge', () => {
    test('should be mutable', () => {
      const a = Object.create(null);
      const b = { foo: 123 };

      const c = merge(a, b);

      expect(c.foo).toBe(123);
    });

    test('should extend properties', () => {
      const a = { foo: 123, bar: 456 };
      const b = { bar: 789 };
      const c = merge(a, b);

      expect(c.foo).toBe(123);
      expect(c.bar).toBe(789);
    });
  });
});
