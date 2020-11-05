import { isArray, isPlainObject, isDate } from '@/utils/utils';

function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

function changeValue(key: string, value: any) {
  let val;
  if (isDate(value)) {
    val = value.toISOString();
  } else if (isPlainObject(value)) {
    val = JSON.stringify(value);
  } else {
    val = value;
  }
  return `${encode(key)}=${encode(val)}`;
}

function buildUrl(url: string, params?: Store) {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === null || typeof value === 'undefined') {
      return;
    }

    if (isArray(value)) {
      value.forEach((val: any) => {
        const arrValKey = `${key}[]`;
        parts.push(changeValue(arrValKey, val));
      });
    } else {
      parts.push(changeValue(key, value));
    }
  });

  const serializedParams = parts.join('&');

  if (serializedParams) {
    [url] = url.split('#');
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

export default buildUrl;
