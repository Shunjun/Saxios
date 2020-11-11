import { RequestConfig } from '@/types';

interface CacheKeyType {
  url: string;
  params: Store | undefined;
  method: Method;
}

class CacheMap {
  cache: Map<string, XMLHttpRequest>;
  timer: Store;
  maxCache: number;
  constructor(config: RequestConfig) {
    this.cache = new Map();
    this.timer = {};
    this.maxCache = 0;
    this.setMaxCachefromConfig(config);
  }
  setMaxCachefromConfig(config: RequestConfig) {
    this.maxCache = config.maxCache || 0;
  }

  set(key: CacheKeyType, value: XMLHttpRequest, ttl: number | undefined = 60000) {
    if (this.maxCache > 0 && this.cache.size >= this.maxCache) {
      const deleteKey = [...this.cache.keys()][0];
      this.cache.delete(deleteKey);
      if (deleteKey in this.timer) {
        delete this.timer[deleteKey];
      }
    }
    const catcheKey = JSON.stringify(key);
    this.cache.set(catcheKey, value);
    if (ttl > 0) {
      this.timer[catcheKey] = setTimeout(() => {
        this.cache.delete(catcheKey);
        delete this.timer[catcheKey];
      }, ttl);
    }
  }
  get(key: CacheKeyType) {
    const cacheKey = JSON.stringify(key);
    return this.cache.get(cacheKey);
  }
  delete(key: CacheKeyType) {
    const cacheKey = JSON.stringify(key);
    delete this.timer[cacheKey];
    return this.cache.delete(cacheKey);
  }
  clear() {
    this.timer = {};
    return this.cache.clear();
  }
}

export default CacheMap;
