import {
  RequestConfig,
  SaxiosPromise,
  SaxiosInterceptorManager,
  SaxiosResponse,
  CancelTokenStatic,
  CancelStatic,
} from '@/types';

export interface createFn {
  (config: RequestConfig): SaxiosStatic;
}

export interface RequestFn {
  <T = any>(config: RequestConfig): SaxiosPromise<T>;
}

export interface SaxiosTransformer<T = any> {
  (data: T, headers?: any): T;
}

export interface Saxios {
  request<T = any>(config: RequestConfig): SaxiosPromise<T>;
  get<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;
  delete<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;
  head<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;
  options<T = any>(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise<T>;
  post<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;
  put<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;
  patch<T = any>(url: Url | RequestConfig, data?: any, config?: RequestConfig): SaxiosPromise<T>;
  _request: RequestFn;
  interceptors: {
    request: SaxiosInterceptorManager<RequestConfig>;
    response: SaxiosInterceptorManager<SaxiosResponse>;
  };
  default: RequestConfig;
  create: createFn;
  getUri(config?: RequestConfig): string;
}

export interface SaxiosInstance extends Saxios {
  <T = any>(config: RequestConfig): SaxiosPromise<T>;
  <T = any>(url: Url, config?: RequestConfig): SaxiosPromise<T>;
}

export interface SaxiosStatic extends SaxiosInstance {
  create: createFn;

  CancelToken: CancelTokenStatic;
  Cancel: CancelStatic;
  isCancel: (value: any) => boolean;

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>;

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R;
}
