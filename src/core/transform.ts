import { isArray, isFunction } from '@/utils/utils';
import { RequestConfig, SaxiosTransformer, SaxiosResponse } from '@/types';

export function transformData<T>(
  data: T,
  fns?: SaxiosTransformer<T> | SaxiosTransformer<T>[],
  headers?: any,
): T {
  if (!fns) {
    return data;
  }
  if (!isArray(fns)) {
    fns = [fns];
  }
  fns.forEach((fn) => {
    if (!isFunction(fn)) return;
    if (headers) {
      data = fn(data, headers);
    } else {
      data = fn(data);
    }
  });
  return data;
}

export function transformRequestData<T>(config: RequestConfig): T {
  const { data, headers, transformRequest } = config;
  return transformData<T>(data, transformRequest, headers);
}

export function transformResponseData<T>(response: SaxiosResponse<T>) {
  const {
    data,
    config: { transformResponse },
  } = response;
  response.data = transformData(data, transformResponse);
  return response;
}
