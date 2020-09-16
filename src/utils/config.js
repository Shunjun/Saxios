import { assert, isPlainObject } from './utils'
import methods from '../config/methods'
import extend from './extend'

// 用传入的参数创建一个config对象
function createConfig({ config, fnUrl, fnMethod, data }) {
  assert(isPlainObject(config), 'config need be a object')
  let resultConfig = {
    ...config,
  }

  if (fnMethod) {
    assert(typeof fnMethod === 'string', 'method mast be string')
    resultConfig.method = fnMethod.toUpperCase()
  } else if (config.method) {
    assert(typeof config.method === 'string', 'method mast be string')
    resultConfig.method = config.method.toUpperCase()
  }

  if (fnUrl) {
    assert(typeof fnUrl === 'string', 'url mast be string')
    resultConfig.url = fnUrl
  } else if (config.url) {
    assert(typeof config.url === 'string', 'url mast be string')
    resultConfig.url = config.url
  } else {
    assert(false, 'url is required')
  }

  if (data) {
    resultConfig.data = data
  }

  return resultConfig
}

/**
 * 处理用户传入的参数
 * @param  {...any} args 
 * @returns config
 */
export function getStandardConfig(method, ...args) {
  if (typeof args[0] === 'string') {
    switch (args.length) {
      case 1:
        return createConfig({ config: {}, fnUrl: args[0], fnMethod: method })

      case 2:
        return createConfig({ config: args[1], fnUrl: args[0], fnMethod: method })

      case 3:
        return createConfig({ config: args[2], fnUrl: args[0], fnMethod: method, data: args[1] })

      default:
        assert(false, 'args is invalid')
        break;
    }

  } else if (typeof args[0] === 'object') {
    return createConfig({ config: args[0], fnMethod: method })
  } else {
    assert(false, 'args is invalid')
  }
}

export function handleDefaultconfig(config = {}) {
  let newHeader = {}

  if (config.headers) {
    const headers = config.headers

    Object.keys(headers).forEach(header => {

      for (const meth of methods) {
        if (header.toUpperCase() === meth.toUpperCase()) {
          newHeader[meth.toUpperCase()] = headers[header]
          delete headers[header]
          return
        }
      }

      if (!newHeader.common) newHeader.common = {}

      if (header.toLowerCase() === 'common') {
        newHeader.common = extend(true, newHeader.common, headers[header])
        delete headers[header]
        return
      }

      newHeader.common[header] = headers[header]
    })

    delete config.headers
  }
  config.defaultHeaders = newHeader

  return config
}