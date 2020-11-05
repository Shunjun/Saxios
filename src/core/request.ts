import { requestDataFormat } from '@/helper/data';
import { RequestConfig } from '@/types';
import mergeConfig from '@/helper/mergeConfig';
import { transformRequestData } from './transform';

function cerateRequestConfig(defaultConfig: Partial<RequestConfig>, customConfig: RequestConfig) {
  const config = mergeConfig(defaultConfig, customConfig);
  const { data } = config;

  if (config.method) {
    config.method = config.method.toLowerCase() as Method;
  } else if (defaultConfig.method) {
    config.method = defaultConfig.method.toLowerCase() as Method;
  } else {
    config.method = 'get';
  }

  if (data) {
    config.data = requestDataFormat(transformRequestData(config));
  }

  return config;
}

export default cerateRequestConfig;
