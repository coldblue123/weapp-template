export default class CacheItem {
  /**
   * 缓存item
   * @param {Any} data 缓存数据
   * @param {Number} timeout 缓存时长，计算缓存过期时间，单位-秒
   * @param {Any} cacheLabel 缓存标记，对比标记极端缓存是否过期
   */
  constructor(data, timeout, cacheLabel = null) {
    this.data = data;
    this.cacheLabel = cacheLabel;
    this.expireTime = timeout ? new Date().getTime() + timeout * 1000 : null;
  }
}
