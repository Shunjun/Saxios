import { Saxios } from '@/core/saxios';
import { SaxiosPromise, SaxiosInterceptorManager, SaxiosResponse } from '@/types';

export interface createFn {
  (config: RequestConfig): SaxiosInstance;
}

export interface RequestFn {
  <T = any>(config: RequestConfig): SaxiosPromise<T>;
}

export interface SaxiosTransformer<T> {
  (data: T, headers?: any): T;
}

export interface Saxios {
  interceptors: {
    request: SaxiosInterceptorManager<RequestConfig>;
    response: SaxiosInterceptorManager<SaxiosResponse>;
  };

  request<T = any>(config: RequestConfig): SaxiosPromise<T>;

  get<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;

  delete<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;

  head<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;

  options<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;

  post<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;

  put<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;

  patch<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;

  _request: RequestFn;
}

export interface SaxiosInstance extends Saxios {
  <T = any>(config: RequestConfig): SaxiosPromise<T>;

  <T = any>(url: Url, config: RequestConfig): SaxiosPromise<T>;
}
