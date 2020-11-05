import { standardizeConfig, reloadGetParams, reloadPostParams } from '@/helper/config';
import { merge } from '@/utils/utils';
import defaultconfig from '@/config/defaultConfig';
import {
  createFn,
  SaxiosInstance,
  RequestConfig,
  SaxiosPromise,
  SaxiosResponse,
  ResolvedFn,
  RejectedFn,
} from '@/types';
import cerateRequestConfig from './request';
import InterceptorManager from './interceptors';
import dispatchRequest from './dispatchRequest';

interface Interceptors {
  request: InterceptorManager<RequestConfig>;
  response: InterceptorManager<SaxiosResponse>;
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: RequestConfig) => SaxiosPromise);
  rejected?: RejectedFn;
}

const create: createFn = function (config) {
  const meargeconfig = merge(defaultconfig, config);

  return new Saxios(meargeconfig) as SaxiosInstance;
};

export class Saxios {
  default: Partial<RequestConfig>;

  private interceptors: Interceptors;

  static create = create;

  public create = create;

  constructor(initConfig: Partial<RequestConfig>) {
    const _this = this;
    this.default = initConfig;
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<SaxiosResponse>(),
    };

    return (new Proxy(() => {}, {
      get(_target, name: keyof typeof _this) {
        return _this[name];
      },

      set(_target, name: keyof typeof _this, value) {
        _this[name] = value;
        return true;
      },

      apply(_func, _thisarg, args) {
        // eslint-disable-next-line prefer-const
        let [url, config] = args;
        config = reloadGetParams(url, config);
        return _this._request(config);
      },
    }) as unknown) as SaxiosInstance;
  }

  request(config: RequestConfig) {
    const standardConfig = standardizeConfig(config);
    return this._request(standardConfig);
  }

  get(config: RequestConfig): SaxiosPromise;
  get(url: Url, config?: RequestConfig): SaxiosPromise;
  get(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise {
    config = reloadGetParams(url, config, 'get');
    return this._request(config);
  }

  delete(config: RequestConfig): SaxiosPromise;
  delete(url: Url, config?: RequestConfig): SaxiosPromise;
  delete(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise {
    config = reloadGetParams(url, config, 'delete');
    return this._request(config);
  }

  post(config: RequestConfig): SaxiosPromise;
  post(url: Url, data?: any, config?: RequestConfig): SaxiosPromise;
  post(url: Url | RequestConfig, data?: any, config?: RequestConfig) {
    config = reloadPostParams(url, data, config, 'post');
    return this._request(config);
  }

  put(config: RequestConfig): SaxiosPromise;
  put(url: Url, data?: any, config?: RequestConfig): SaxiosPromise;
  put(url: Url | RequestConfig, data?: any, config?: RequestConfig) {
    config = reloadPostParams(url, data, config, 'put');
    return this._request(config);
  }

  patch(config: RequestConfig): SaxiosPromise;
  patch(url: Url, data?: any, config?: RequestConfig): SaxiosPromise;
  patch(url: Url | RequestConfig, data?: any, config?: RequestConfig) {
    config = reloadPostParams(url, data, config, 'patch');
    return this._request(config);
  }

  _request<T>(standardConfig: RequestConfig): SaxiosPromise<T> {
    const config = cerateRequestConfig(this.default, standardConfig);

    // 创建拦截器调用链 请求函数在最中间
    const chain: PromiseChain[] = [{ resolved: dispatchRequest, rejected: undefined }];

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return (promise as unknown) as SaxiosPromise<T>;
  }
}

const saxios = Saxios.create({});

export default saxios;
