import { isArray, isPlainObject } from './utils';

/**
 * 拷贝函数
 * @param  {...any} args
 */
export default function extend(...args: any[]) {
  let target = args[0];
  let start = 1;
  let isDeep = false;
  const len = args.length;

  if (typeof args[0] === 'boolean') {
    isDeep = true;
    [target] = args;
    start++;
  }

  if (typeof target !== 'object') {
    target = {};
  }

  for (; start < len; start++) {
    const source = args[start];

    if (typeof source !== 'object') break;

    Object.keys(source).forEach((key) => {
      let targetValue = target[key];
      const sourceValue = source[key];

      // 防止环形引用
      if (target === sourceValue) {
        return;
      }

      // 如果拷贝的对象是对象或者数组
      if (isDeep && sourceValue && (isArray(sourceValue) || isPlainObject(sourceValue))) {
        if (isArray(sourceValue)) {
          targetValue = targetValue && isArray(targetValue) ? targetValue : [];
        } else {
          targetValue = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }

        target[key] = extend(isDeep, targetValue, sourceValue);
        // 否则直接赋值
      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    });
  }

  return target;
}
