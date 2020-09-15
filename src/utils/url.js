import urllib from 'url'
import { isArray, isPlainObject, isDate } from './utils'

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function changeValue(key, value) {
  let val
  if (isDate(value)) {
    val = value.toISOString()
  } else if (isPlainObject(value)) {
    val = JSON.stringify(value)
  } else {
    val = value
  }
  return `${encode(key)}=${encode(val)}`
}

export function buildUrl(url, baseURL, params) {
  let resultUrl = urllib.resolve(baseURL, url)

  if (!params) {
    return resultUrl
  }

  let parts = []

  Object.keys(params).forEach(key => {
    let value = params[key]

    if (isArray(value)) {

      value.forEach((val, index) => {
        let arrValKey = key + '[]'
        parts.push(changeValue(arrValKey, val))
      })

    } else {
      parts.push(changeValue(key, value))
    }
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    resultUrl = resultUrl.split('#')[0]
    resultUrl += (resultUrl.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return resultUrl
}