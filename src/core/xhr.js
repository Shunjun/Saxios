import { assert } from '../utils/utils'
import { createError } from './error'
import { createResponse } from './response'

export const request = function (config) {
  assert(config, 'options is requird')

  const { data, requestUrl, method, headers, responseType, timeout } = config

  const xhr = new XMLHttpRequest()

  responseType && (xhr.responseType = responseType)
  timeout && (xhr.timeout = timeout)

  xhr.open(method.toUpperCase(), requestUrl, true)

  Object.keys(headers).forEach((name) => {
    xhr.setRequestHeader(name, headers[name])
  })

  xhr.send(data)

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }

      let response = createResponse(xhr, config)
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        let error = createError({
          message: 'Network Error',
          code: null,
          config,
          request: xhr,
          response
        })
        reject(error)
      }
    }

    xhr.onerror = function () {
      let error = createError({
        message: 'Network Error',
        config,
        code: null,
        request: xhr
      })
      reject(error)
    }

    xhr.ontimeout = function () {
      let error = createError({
        message: `Timeout of ${config.timeout} ms exceeded`,
        config,
        code: 'ECONNABORTED',
        request: xhr
      })
      reject(error)
    }

  })
};

export default request;
