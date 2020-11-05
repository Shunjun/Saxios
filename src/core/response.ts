import { RequestConfig, SaxiosResponse } from '@/types';
import parseHeaders from '@/helper/parseHeaders';
import { responseDataFormat } from '@/helper/data';
import { transformResponseData } from './transform';

export function createResponse(xhr: XMLHttpRequest, options: RequestConfig): SaxiosResponse {
  const { responseType } = options;

  const responseHeaders = parseHeaders(xhr.getAllResponseHeaders());
  let responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText;
  responseData = responseDataFormat(responseData);

  let response: SaxiosResponse = {
    data: responseData,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: responseHeaders,
    config: options,
    request: xhr,
  };

  response = transformResponseData(response);

  return response;
}

export default createResponse;
