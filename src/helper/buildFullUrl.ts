import isAbsoluteURL from '@/helper/isAbsoluteURL';
import { isUndefined } from '@/utils/utils';
import combineURLs from './combineURLs';

function buildFullUrl(baseURL: string | undefined, requestedURL: string): string;
function buildFullUrl(requestedURL: string): string;
function buildFullUrl(baseURL: string | undefined, requestedURL?: string) {
  if (isUndefined(requestedURL)) {
    requestedURL = baseURL;
    baseURL = undefined;
  }

  if (baseURL && !isAbsoluteURL(requestedURL!)) {
    return combineURLs(baseURL, requestedURL!);
  }

  return requestedURL;
}

export default buildFullUrl;
