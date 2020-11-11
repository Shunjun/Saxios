import { RequestConfig } from '@/types/index';

const defaultConfig: Partial<RequestConfig> = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },

  transformRequest: [],

  transformResponse: [],

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },

  ttl: 60000,
};

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach((method) => {
  defaultConfig.headers[method] = {};
});

const methodsNoData = ['get', 'delete', 'head', 'options'];

methodsNoData.forEach((method) => {
  defaultConfig.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
});

export default defaultConfig;
