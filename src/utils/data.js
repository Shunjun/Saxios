import { isPlainObject } from './utils'

export function requestDataFormat(data) {
  if (isPlainObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}

export function responseDataFormat(data) {
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  return data
}