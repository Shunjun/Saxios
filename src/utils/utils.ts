export function assert(fix: any, msg = '条件不满足') {
  if (!fix) {
    throw new Error(msg);
  }
}

export function isArray(obj: any): obj is Array<any> {
  if (Array.isArray) {
    return Array.isArray(obj);
  }
  return obj instanceof Array;
}

export function isWindow(obj: any): obj is Window {
  return obj === globalThis;
}

export function isDate(obj: any): obj is Date {
  return Object.getPrototypeOf(obj) === Date.prototype;
}

export function isObject(obj: any): obj is Object {
  return obj instanceof Object;
}

export function isFunction(fn: any): fn is Function {
  console.log(Object.prototype.toString.call(fn));
  return fn instanceof Function || Object.prototype.toString.call(fn) === '[Object Function]';
}

export function isUndefined(obj: any): obj is undefined {
  return typeof obj === 'undefined';
}

// 判断是Formdata
export function isFormData(data: any): data is FormData {
  return !isUndefined(data) && data instanceof FormData;
}

/**
 * 是普通的Object
 */
export function isPlainObject(obj: any) {
  return (
    obj instanceof Object &&
    !isWindow(obj) &&
    // 如果不是普通的object,Object.prototype需要通过链回溯才能得到
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

// 遍历对象
export function forEach(obj: any, fn: (item: any, key?: string | number) => void) {
  if (obj === null || obj === undefined) {
    return;
  }
  if (typeof obj !== 'object') {
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, key) => fn(item, key));
  } else {
    Object.keys(obj).forEach((key) => fn(obj[key], key));
  }
}

export function merge(...arg: any[]) {
  const result: Store = {};
  function assignValue(val: any, key: string) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  forEach(arg, (obj) => {
    forEach(obj, (value, key) => assignValue(value, key as string));
  });

  return result;
}

export function isURLSearchParams(obj: any): obj is URLSearchParams {
  return obj instanceof URLSearchParams;
}
