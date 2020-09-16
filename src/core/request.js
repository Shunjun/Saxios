import { assert } from '../utils/utils'
import { processHeaders } from '../utils/headers'
import { requestDataFormat } from '../utils/data'
import { buildUrl } from '../utils/url'
import { transformRequestData } from './transform'

export function cerateRequest(config) {
  const { defaultHeaders, headers, data, method, url, params, baseURL, responseType } = config
  assert(method, 'method is required')

  config = {
    ...config,
    requestUrl: buildUrl(url, baseURL, params),
    headers: processHeaders({ headers, defaultHeaders, method, data }),
  }

  if (responseType) {
    options.responseType = responseType
  }

  if (data) {
    data = transformRequestData(config)
    data = requestDataFormat(data)
    config.data = data
  }

  return config
}