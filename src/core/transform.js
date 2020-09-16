import { isArray, isFunction } from '../utils/utils'

export function transformData(data, fns, headers) {
  if (!fns) {
    return data
  }
  if (!isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    if (!isFunction(fn)) return
    if (headers) {
      data = fn(data, headers)
    } else {
      data = fn(data)
    }
  })
  return data
}

export function transformRequestData(config) {
  const { data, headers, transformRequest } = config
  return transformData(data, transformRequest, headers)
}

export function transformResponseData(response) {
  const { data, transformRequest } = response
  response.data = transformData(data, transformRequest)
  return response
}


