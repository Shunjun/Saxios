import { RequestConfig, SaxiosPromise } from '@/types';
import { transformRequestData, transformResponseData } from '@/core/transform';
import processHeaders from '@/helper/headers';
import request from '@/adapters/xhr';

export default function dispatchRequest(config: RequestConfig): SaxiosPromise {
  throwIfCancellationRequseted(config);

  config.headers = config.headers || {};

  config.headers = processHeaders(config.headers, config.method!, config.data);
  config.data = transformRequestData(config);

  return request(config)
    .then((res) => {
      return transformResponseData(res);
    })
    .catch((err) => {
      if (err && err.response) {
        err.response = transformResponseData(err.response);
      }
      return Promise.reject(err);
    });
}

function throwIfCancellationRequseted(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
