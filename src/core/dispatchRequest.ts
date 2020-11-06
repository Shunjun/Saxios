import { RequestConfig, SaxiosPromise } from '@/types';
import { transformRequestData } from '@/core/transform';
import processHeaders from '@/helper/headers';
import request from '@/adapters/xhr';

export default function dispatchRequest(config: RequestConfig): SaxiosPromise {
  throwIfCancellationRequseted(config);

  config.headers = config.headers || {};

  config.headers = processHeaders(config.headers, config.method!, config.data);
  config.data = transformRequestData(config);

  return request(config);
}

function throwIfCancellationRequseted(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
