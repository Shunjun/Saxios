import { RequestConfig, SaxiosResponse } from '@/types';
import { transformURL } from '@/helper/buildUrl';
import CacheMap from '@/helper/cacheMap';

function __defaultValidateCache(_url: Url, options: RequestConfig) {
  const { method = 'get' } = options;
  return method.toLowerCase() === 'get';
}

function getNeedCache(config: RequestConfig): boolean {
  const { validateCache = __defaultValidateCache } = config;
  // 判断是否需要缓存
  return validateCache(transformURL(config), config);
}

// 从缓存中获取
function checkCachebefoRquest(
  cacheMap: CacheMap,
  config: RequestConfig,
): XMLHttpRequest | undefined {
  let responseCache: XMLHttpRequest | undefined;

  const buildedUrl = transformURL(config);
  const needCache = getNeedCache(config);

  if (needCache) {
    responseCache = cacheMap.get({
      url: buildedUrl,
      method: config.method!,
      params: config.params,
    });
  }

  return responseCache;
}

function shouldCatcheafterRequest(cacheMap: CacheMap, response: SaxiosResponse) {
  const { config } = response;
  const needCache = getNeedCache(config);
  if (needCache) {
    const buildedUrl = transformURL(config);
    const copy = response.request.clone();
    copy.useCache = true;
    cacheMap.set(
      { url: buildedUrl, method: config.method!, params: config.params },
      copy,
      config.ttl,
    );
  }
}

export { checkCachebefoRquest, shouldCatcheafterRequest };
