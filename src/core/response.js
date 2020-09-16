import { parseHeaders } from '../utils/headers'
import { responseDataFormat } from '../utils/data'
import { transformResponseData } from './transform'

export function createResponse(xhr, options) {
  const { responseType } = options

  console.log(options)

  const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())

  let responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
  responseData = responseDataFormat(responseData)

  let response = {
    data: responseData,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: responseHeaders,
    config: options,
    request: xhr
  }

  response = transformResponseData(response)

  return response
}

export default createResponse