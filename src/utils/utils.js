export function assert(fix, msg = "条件不满足") {
  if (!fix) {
    throw new Error(msg);
  }
}

export function isArray(object) {
  if (Array.isArray) {
    return Array.isArray(object);
  }
  return object instanceof Array;
}

export function isWindow(obj) {
  return obj === window
}

export function isDate(obj) {
  return Object.getPrototypeOf(obj) === Date.constructor
}

export function isObject(obj) {
  return obj instanceof Object
}

export function isFunction(fn) {
  console.log(Object.prototype.toString.call(fn))
  return fn instanceof Function || Object.prototype.toString.call(fn) === '[Object Function]'
}

/** 
 * 是普通的Object
 */
export function isPlainObject(obj) {
  return obj instanceof Object
    && !isWindow(obj)
    // 如果不是普通的object,Object.prototype需要通过链回溯才能得到
    && Object.getPrototypeOf(obj) === Object.prototype;
}