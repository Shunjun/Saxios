import { forEach, isPlainObject, merge } from '@/utils/utils';

// 处理请求头大小写
function normalizeHeaderName(headers: any, normalizedNames: string[]): void {
  if (!headers) {
    return;
  }

  normalizedNames.forEach((name) => {
    Object.keys(headers).forEach((key) => {
      if (name.toUpperCase() === key.toUpperCase() && name !== key) {
        headers[name] = headers[key];
        delete headers[key];
      }
    });
  });
}

// 合并请求头
function mergeHeaders(headers: any, method: Method) {
  const mergedHeaders: any = merge(headers.common || {}, headers[method], headers);

  forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common', 'options'], (key) => {
    delete mergedHeaders[key];
  });

  return mergedHeaders;
}

function processHeaders(headers: any, method: Method, data: any) {
  let newHeaders: Store = {};

  if (!headers) {
    return newHeaders;
  }

  newHeaders = mergeHeaders(headers, method);

  normalizeHeaderName(newHeaders, ['Content-Type']);

  if (isPlainObject(data)) {
    if (newHeaders && !newHeaders['Content-Type']) {
      newHeaders['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return newHeaders;
}

export default processHeaders;
