import { RequestConfig } from '@/types';
import { isArray, isPlainObject, isDate, isURLSearchParams } from '@/utils/utils';
import buildFullUrl from './buildFullUrl';

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

function buildUrl(url: string, params?: Store, paramsSerializer?: (p: any) => string) {
  if (!params) {
    return url;
  }

  let serializedParams: string;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
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

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    [url] = url.split('#');
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

export function transformURL(config: RequestConfig) {
  const { baseURL, url, params, paramsSerializer } = config;
  return buildUrl(buildFullUrl(baseURL, url), params, paramsSerializer);
}

export default buildUrl;
