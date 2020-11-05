import { assert, isPlainObject } from '@/utils/utils';
import { RequestConfig } from '@/types';

export function reloadGetParams(
  url: Url | RequestConfig,
  config?: RequestConfig,
  method?: Method,
): RequestConfig {
  if (typeof url === 'string') {
    if (!config) {
      config = { url };
    }
    config.url = url;
  } else {
    config = url;
  }
  return standardizeConfig(config, method);
}

export function reloadPostParams(
  url: Url | RequestConfig,
  data?: any,
  config?: RequestConfig,
  method?: Method,
): RequestConfig {
  if (typeof url === 'string') {
    if (!config) {
      config = { url };
    }
    config.url = url;
    config.data = data;
  } else {
    config = url;
  }
  return standardizeConfig(config, method);
}

// 用传入的参数创建一个标准config对象
export function standardizeConfig(config: RequestConfig, method?: Method): RequestConfig {
  assert(isPlainObject(config), 'config need be a object');

  if (method) {
    assert(typeof method === 'string', 'method mast be string');
    config.method = method.toUpperCase() as Method;
  } else if (config.method) {
    assert(typeof config.method === 'string', 'method mast be string');
    config.method = config.method.toUpperCase() as Method;
  }

  return config;
}
