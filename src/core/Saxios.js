import request from "./xhr"
import { getStandardConfig, handleDefaultconfig } from '../utils/config'
import extend from '../utils/extend'
import defaultconfig from '../config/defaultConfig'
import { cerateRequest } from './request'
import { assert, isPlainObject } from "../utils/utils"
import interceptors from './interceptors'


const Saxios = class {
  constructor() {
    let _this = this;
    this.default = {}
    this.interceptors = {
      request: new interceptors(),
      response: new interceptors()
    }

    return new Proxy(request, {
      get(_target, name) {
        return _this[name];
      },

      set(_target, name, value) {
        _this[name] = value
        return true
      },

      apply(_func, _thisarg, args) {
        const standardConfig = getStandardConfig(undefined, ...args)
        return _this._request(standardConfig)
      },
    });
  }

  request(...args) {
    assert(args.length === 1, 'args is invlid')
    assert(isPlainObject(args[0]), 'config need be a object')
    const standardConfig = getStandardConfig(undefined, ...args)
    return this._request(standardConfig)
  }

  get(...args) {
    let standardConfig = getStandardConfig('get', ...args)
    return this._request(standardConfig)
  }

  delete(...args) {
    const standardConfig = getStandardConfig('delete', ...args)
    return this._request(standardConfig)
  }

  post(...args) {
    const standardConfig = getStandardConfig('post', ...args)
    return this._request(standardConfig)
  }

  _request(standardConfig) {
    let config = extend(true, {}, this.default, standardConfig)
    config = cerateRequest(config)

    // 创建拦截器调用链
    // 请求函数在最中间
    let chain = [{ resolve: request, reject: undefined }]

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      let { resolve, reject } = chain.shift()
      promise = promise.then(resolve, reject)
    }

    return promise
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
