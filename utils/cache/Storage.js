import ExpireCache from './ExpireCache';
import StorageMap from './StorageMap';

export default class Storage extends ExpireCache {
  static cacheMap = new StorageMap();
  static getCacheName(name) {
    return `${INJECTION_FROM_WEBPACK.serverType}iyourcar_cache_${name}`;
  } 
}
