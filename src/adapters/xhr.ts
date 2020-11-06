import { transformURL } from '@/helper/buildUrl';
import isURLSameOrigin from '@/helper/isURLSameOrigin';
import { RequestConfig, SaxiosResponse, SaxiosPromise } from '@/types';
import { assert, isFormData } from '@/utils/utils';
import { createError } from '@/core/error';
import { createResponse } from '@/core/response';
import cookie from '@/helper/cookie';

export function request<T>(config: RequestConfig): SaxiosPromise<T> {
  assert(config, 'options is requird');

  return new Promise((resolve, reject) => {
    const {
      auth,
      url,
      data,
      method,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      validateStatus,
    } = config;

    const xhr = new XMLHttpRequest();

    const buildedUrl = transformURL(config);
    xhr.open(method!.toUpperCase(), buildedUrl, true);

    configToXhr();

    ProcessHeader();

    handleCancel();

    addEventsListeners();

    xhr.send(data);

    function configToXhr(): void {
      responseType && (xhr.responseType = responseType);
      timeout && (xhr.timeout = timeout);
      withCredentials && (xhr.withCredentials = true);
    }

    function handleCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then((reason) => {
          xhr.abort();
          reject(reason);
        });
      }
    }

    function addEventsListeners(): void {
      onDownloadProgress && (xhr.onprogress = onDownloadProgress);
      onUploadProgress && (xhr.upload.onprogress = onUploadProgress);

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        const response = createResponse(xhr, config);

        handleResponse(response);
      };

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
    }

    function handleResponse(response: SaxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        const error = createError({
          message: `Request failed with status code ${response.status}`,
          code: null,
          config,
          request: xhr,
          response,
        });
        reject(error);
      }
    }

    function ProcessHeader(): void {
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue;
        }
      }

      if (auth) {
        headers.Authorization = `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
      }

      if (isFormData(data)) {
        delete headers['Content-Type'];
      }

      Object.keys(headers).forEach((name) => {
        xhr.setRequestHeader(name, headers[name]);
      });
    }
  });
}

export default request;
