import { standardizeConfig, reloadGetParams, reloadPostParams } from '@/helper/config';
import { merge } from '@/utils/utils';
import mixin from '@/utils/mixin';
import defaultconfig from '@/config/defaultConfig';
import {
  SaxiosStatic,
  RequestConfig,
  SaxiosPromise,
  SaxiosResponse,
  ResolvedFn,
  RejectedFn,
} from '@/types';
import CancelToken from '@/cancel/cancelToken';
import Cancel, { isCancel } from '@/cancel/Cancel';
import mergeConfig from '@/helper/mergeConfig';
import { transformURL } from '@/helper/buildUrl';
import CatcheMap from '@/helper/cacheMap';
import { checkCachebefoRquest, shouldCatcheafterRequest } from './cache';
import cerateRequestConfig from './request';
import InterceptorManager from './interceptors';
import dispatchRequest from './dispatchRequest';
import createResponse from './response';

interface PromiseChain {
  resolved: ResolvedFn | ((config: RequestConfig) => SaxiosPromise);
  rejected?: RejectedFn;
}

function create(config: Partial<RequestConfig>): SaxiosStatic {
  const meargeconfig = merge(defaultconfig, config);

  let saxios = new Saxios(meargeconfig);

  saxios = mixin(saxios, {
    Cancel,
    isCancel,
    CancelToken,
    all: function all<T>(promises: Array<T | Promise<T>>): Promise<T[]> {
      return Promise.all(promises);
    },
    spread: function spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R {
      return function wrap(arr) {
        return callback(...arr);
      };
    },
  });

  return (saxios as unknown) as SaxiosStatic;
}

export class Saxios {
  default: Partial<RequestConfig>;

  interceptors: {
    request: InterceptorManager<RequestConfig>;
    response: InterceptorManager<SaxiosResponse>;
  };

  cacheMap: CatcheMap;

  constructor(initConfig: Partial<RequestConfig>) {
    const _this = this;
    this.default = initConfig;
    this.cacheMap = new CatcheMap(initConfig);
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
    }) as unknown) as this;
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

  head(config: RequestConfig): SaxiosPromise;
  head(url: Url, config?: RequestConfig): SaxiosPromise;
  head(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise {
    config = reloadGetParams(url, config, 'head');
    return this._request(config);
  }

  options(config: RequestConfig): SaxiosPromise;
  options(url: Url, config?: RequestConfig): SaxiosPromise;
  options(url: Url | RequestConfig, config?: RequestConfig): SaxiosPromise {
    config = reloadGetParams(url, config, 'options');
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

  getUri(config?: RequestConfig): string {
    config = mergeConfig(this.default, config);
    return transformURL(config);
  }

  _request<T>(standardConfig: RequestConfig): SaxiosPromise<T> {
    const config = cerateRequestConfig(this.default, standardConfig);

    // 判断缓存,如果存在则使用缓存
    const catche = checkCachebefoRquest(this.cacheMap, config);
    if (catche) {
      const response = createResponse(catche, config);
      return Promise.resolve(response);
    }

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

    // 缓存数据
    ((promise as unknown) as SaxiosPromise<T>).then((response) => {
      if (response.config.useCache) {
        shouldCatcheafterRequest(this.cacheMap, response);
      }
    });

    return (promise as unknown) as SaxiosPromise<T>;
  }

  create = create;

  static create = create;
}

const saxios = Saxios.create({});

export default saxios;
