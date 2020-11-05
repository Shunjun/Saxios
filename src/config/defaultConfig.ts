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
