import request from "./core/xhr";
import { assert } from './utils/utils'
import { getStandardConfig, handleDefaultconfig } from './utils/config'
import { buildUrl } from './utils/url'
import extend from './utils/extend'
import defaultconfig from './config/defaultConfig'
import { transformRequest } from './utils/data'
import { processHeaders } from './utils/headers'

const Saxios = class {
  constructor() {
    let _this = this;
    this.default = {}
    return new Proxy(request, {
      get(_target, name) {
        return _this[name];
      },

      set(_target, name, value) {
        _this[name] = value
        return true
      },

      apply(func, _thisarg, args) {
        func(...args);
        return true
      },

    });
  }

  get(...args) {
    let standardConfig = getStandardConfig('get', ...args)
    let config = extend(true, {}, this.default, standardConfig)

    let { defaultHeaders, headers, data, method, url, params, baseURL } = config

    assert(method, 'method is required')

    let options = {
      url: buildUrl(url, baseURL, params),
      method,
      header: processHeaders({ headers, defaultHeaders, method, data }),
      data: transformRequest(data),
    }

    console.log(options);
    return request(options)
  }

  delete(...args) {
    const config = getStandardConfig('delete', ...args)


  }

  post(...args) {
    const config = getStandardConfig('post', ...args)


  }
};

Saxios.create = Saxios.prototype.create = function (config = {}) {
  const saxios = new Saxios()
  const handledconfig = handleDefaultconfig(config)
  saxios.default = extend(true, {}, defaultconfig, handledconfig)


  return saxios
}

let saxios = Saxios.create()

export default saxios;
