import { RequestConfig, SaxiosPromise } from '@/types';
import { transformRequestData } from '@/core/transform';
import processHeaders from '@/helper/headers';
import request from './xhr';

export default function dispatchRequest(config: RequestConfig): SaxiosPromise {
  config.headers = config.headers || {};

  config.headers = processHeaders(config.headers, config.method!, config.data);
  config.data = transformRequestData(config);

  return request(config);
}
