import { isPlainObject } from './utils'

export function transformRequest(data) {
  if (isPlainObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}