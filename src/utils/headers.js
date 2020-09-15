import { isPlainObject } from './utils'
import extend from './extend'

// 处理请求头大小写
function normalizeHeaderName(headers, normalizedNames) {
  if (!headers) {
    return
  }
  normalizedNames.forEach(name => {
    Object.keys(headers).forEach(key => {
      if (name.toUpperCase() === key.toUpperCase() && name !== key) {
        headers[name] = headers[key]
        delete headers[key]
      }
    })
  })
  return headers
}

// 合并请求头
function mergeHeaders(method, defaultHeaders, headers) {
  if (!headers && !defaultHeaders) return

  let mergedHeaders = {}

  if (defaultHeaders?.common) {
    extend(true, mergedHeaders, defaultHeaders.common)
  }

  if (defaultHeaders?.[method.toUpperCase()]) {
    extend(true, mergedHeaders, defaultHeaders[method.toUpperCase()])
  }

  if (headers) {
    extend(true, mergedHeaders, headers)
  }
  return mergedHeaders
}


export function processHeaders({ headers, defaultHeaders, method, data }) {

  let newHeaders = mergeHeaders(method, defaultHeaders, headers)

  normalizeHeaderName(newHeaders, ['Content-Type'])

  if (isPlainObject(data)) {
    if (newHeaders && !newHeaders['Content-Type']) {
      newHeaders['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return newHeaders
}