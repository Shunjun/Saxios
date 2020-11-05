import buildUrl from '@/helper/buildUrl';
import buildFullUrl from '@/helper/buildFullUrl';
import { RequestConfig, SaxiosResponse, SaxiosPromise } from '@/types';
import { assert } from '@/utils/utils';
import { createError } from './error';
import { createResponse } from './response';

export function request<T>(config: RequestConfig): SaxiosPromise<T> {
  assert(config, 'options is requird');

  const { baseURL, url, data, params, method = 'GET', headers, responseType, timeout } = config;

  const xhr = new XMLHttpRequest();

  responseType && (xhr.responseType = responseType);
  timeout && (xhr.timeout = timeout);

  console.log(baseURL);
  const fullUrl = buildFullUrl(baseURL, url);
  console.log(fullUrl);
  xhr.open(method.toUpperCase(), buildUrl(fullUrl, params), true);

  Object.keys(headers).forEach((name) => {
    xhr.setRequestHeader(name, headers[name]);
  });

  xhr.send(data);

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }

      const response = createResponse(xhr, config);

      handleResponse(response);
    };

    function handleResponse(response: SaxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        const error = createError({
          message: 'Network Error',
          code: null,
          config,
          request: xhr,
          response,
        });
        reject(error);
      }
    }

    xhr.onerror = function () {
      const error = createError({
        message: 'Network Error',
        config,
        code: null,
        request: xhr,
      });
      reject(error);
    };

    xhr.ontimeout = function () {
      const error = createError({
        message: `Timeout of ${config.timeout} ms exceeded`,
        config,
        code: 'ECONNABORTED',
        request: xhr,
      });
      reject(error);
    };
  });
}

export default request;
