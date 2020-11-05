import { RequestConfig } from '@/types';
import { forEach, isUndefined, merge, isPlainObject, isArray } from '@/utils/utils';

type RequestConfigItem = RequestConfig[keyof RequestConfig];

/**
 * 合并配置
 * @param config1 默认参数
 * @param config2 自定义参数,权重较高
 */
export default function mergeConfig(
  config1: Partial<RequestConfig>,
  config2: RequestConfig,
): RequestConfig {
  // if (!config2) {
  //   config2 = {};
  // }

  const config = Object.create(null);

  // 默认合并,如果为空则使用默认的字段,否则使用默认字段
  const defaultToConfig2Keys = [
    'baseURL',
    'transformRequest',
    'transformResponse',
    'paramsSerializer',
    'timeout',
    'timeoutMessage',
    'withCredentials',
    'adapter',
    'responseType',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'decompress',
    'maxContentLength',
    'maxBodyLength',
    'maxRedirects',
    'transport',
    'httpAgent',
    'httpsAgent',
    'cancelToken',
    'socketPath',
    'responseEncoding',
  ];
  // 只接受自定义配置的字段
  const valueFromConfig2Keys = ['url', 'params', 'data'];
  // 需要深度合并的字段
  const DeepMergeKeys = ['headers'];

  function getMergedValue(target: RequestConfigItem, source: RequestConfigItem) {
    if (isPlainObject(target) && isPlainObject(source)) {
      return merge(target, source);
    }
    if (isPlainObject(source)) {
      return merge({}, source);
    }
    if (isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function deepMerge(key: keyof RequestConfig) {
    if (!isUndefined(config2![key])) {
      config[key] = getMergedValue(config1[key], config2![key]);
    } else if (!isUndefined(config1[key])) {
      config[key] = getMergedValue(undefined, config1[key]);
    }
  }

  forEach(DeepMergeKeys, (key) => deepMerge(key));

  forEach(valueFromConfig2Keys, (key: keyof RequestConfig) => {
    if (!isUndefined(config2![key])) {
      config[key] = getMergedValue(undefined, config2![key]);
    }
  });

  forEach(defaultToConfig2Keys, (key: keyof RequestConfig) => {
    if (!isUndefined(config2![key])) {
      config[key] = getMergedValue(undefined, config2![key]);
    } else if (!isUndefined(config1[key])) {
      config[key] = getMergedValue(undefined, config1[key]);
    }
  });

  return config;
}
